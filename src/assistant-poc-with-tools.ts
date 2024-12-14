import OpenAI from "openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();
const openai = new OpenAI();

// const prompt = "How many releases are they?";
// const prompt = "What is the latest release?";
// const prompt = "What is the first release?";
// const prompt = "List the releases since version 3.11.0";
// const prompt = "Give me the fixes since version 3.11.0";
// const prompt = "When was 1.0.8 released";
// const prompt = "When was 1.0.0 released";
const prompt = "What are the enhancements added in 3.11.x";

const functionsDef = [
  {
    name: "getAllReleases",
    description: `This function returns a list of all the releases. 
    Call this when you need to figure out which release you need information from`,
    strict: true,
    parameters: {
      type: "object",
      properties: {
        // from: {
        //   type: "string",
        //   description:
        //     "The starting date for filtering releases, in ISO 8601 format (YYYY-MM-DD).",
        // },
        // to: {
        //   type: "string",
        //   description:
        //     "The ending date for filtering releases, in ISO 8601 format (YYYY-MM-DD).",
        // },
      },
      additionalProperties: false,
      // required: ["from", "to"],
      required: [],
    },
  },
  {
    name: "getRelease",
    description: `The function retrieves all the information of a particular release given the release tag. 
    Only call this when you want to know information of a release, including the name, date and changes`,
    strict: true,
    parameters: {
      type: "object",
      properties: {
        tag: {
          type: "string",
          description: "The tag of a release.",
        },
      },
      additionalProperties: false,
      required: ["tag"],
    },
  },
];
// Object with {id: "theid"}
async function getRelease({ tag }: { tag: string }) {
  try {
    const release = fs.readFileSync(`db/superwall/Superwall-iOS/${tag}.md`, {
      encoding: "utf8",
    });
    return release;
  } catch {
    return "I could not find info for release " + tag;
  }
}
function getAllReleases() {
  const releases = JSON.parse(
    fs.readFileSync(`db/superwall/Superwall-iOS/index.json`, {
      encoding: "utf8",
    })
  );
  return releases
    .map(
      (release: { tag_name: string; published_at: string }) =>
        `- ${release.tag_name} published on ${release.published_at}`
    )
    .join("\n");
}

async function handleRequiresAction(run: OpenAI.Beta.Threads.Runs.Run) {
  // Check if there are tools that require outputs
  if (
    run.required_action &&
    run.required_action.submit_tool_outputs &&
    run.required_action.submit_tool_outputs.tool_calls
  ) {
    // Loop through each tool in the required action section
    const toolOutputs = await Promise.all(
      run.required_action.submit_tool_outputs.tool_calls.map(async (tool) => {
        console.log(
          `Calling ${tool.function.name} with ${tool.function.arguments}`
        );
        if (tool.function.name === "getAllReleases") {
          return {
            tool_call_id: tool.id,
            output: getAllReleases(),
          };
        } else if (tool.function.name === "getRelease") {
          return {
            tool_call_id: tool.id,
            output: await getRelease(JSON.parse(tool.function.arguments)),
          };
        }
        throw new Error(`Invalid function called ${tool.function.name}`);
      })
    );

    // Submit all tool outputs at once after collecting them in a list
    if (toolOutputs.length > 0) {
      run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
        thread.id,
        run.id,
        { tool_outputs: toolOutputs }
      );
      console.log("Tool outputs submitted successfully.");
    } else {
      console.log("No tool outputs to submit.");
    }

    // Check status after submitting tool outputs
    return handleRunStatus(run);
  }
  return run;
}

async function handleRunStatus(
  run: OpenAI.Beta.Threads.Runs.Run
): Promise<OpenAI.Beta.Threads.Runs.Run> {
  // Check if the run is completed
  if (run.status === "completed") {
    console.log("run completed");
    // let messages = await openai.beta.threads.messages.list(thread.id);
    // console.log(messages.data);
    return run;
    // return messages.data;
  } else if (run.status === "requires_action") {
    console.log(run.status);
    return await handleRequiresAction(run);
  } else {
    console.error("Run did not complete:", run);
  }
  return run;
}

const generalInstruction =
  "You are an assistant that provides information of the releases of the superwall/Superwall-iOS github project.";
const markdownFormatInstruction =
  "Write the responses in Markdown and when you include a version in the text always add it as a link.";

const htmlFormatInstruction =
  "Write the responses as a simple HTML fragment without styles and when you include a version always add it as an achor tag";

const plainFormatInstruction =
  "Write the responses in plain text (no Markdown) as if you were to print them in a terminal without colours or special characters. When you include a version make sure to include a citation at the end with the link, such as `More info about 1.0.0 in https://the-url-to-release`.";

const alwaysIncludeVersion =
  "When you give information about something that was released, make sure to always include the version when it was released";

const assistant = await openai.beta.assistants.create({
  name: "dirty test superwall with tools",
  instructions: `
    ${generalInstruction}     
    
    ${alwaysIncludeVersion}
    `,
  model: "gpt-4o",
  // tools: [{ type: "file_search" }],
  tools: functionsDef.map((def) => ({ type: "function", function: def })),
});

// V1 first 30 results in one file
// releases-with-description.md (22kb)
// const vector_store_ids = ["vs_8hZxp451ZfPE0Em1EPZlDhHF"];

// V2 all releases in one file
// releases-with-description.md (93kb)
// Can't be used with gpt-4o as it has 30k tokens limit and the file + prompt is around 32k
// const vector_store_ids = ["vs_msrFlIjfC3nCH2cfM7qeACvW"];

// await openai.beta.assistants.update(assistant.id, {
//   tool_resources: {
//     file_search: { vector_store_ids },
//   },
// });

const thread = await openai.beta.threads.create({
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
  assistant_id: assistant.id,
  instructions: plainFormatInstruction,
});

run = await handleRunStatus(run);
if (run.last_error) {
  console.error(run.last_error);
  throw new Error("Error running assistant");
}

const messages = await openai.beta.threads.messages.list(thread.id, {
  run_id: run.id,
});

const message = messages.data.pop()!;
if (message.content[0].type === "text") {
  const { text } = message.content[0];
  const { annotations } = text;
  const citations: string[] = [];

  let index = 0;
  for (let annotation of annotations) {
    text.value = text.value.replace(annotation.text, "[" + index + "]");
    // const { file_citation } = annotation;
    // if (file_citation) {
    //   const citedFile = await openai.files.retrieve(file_citation.file_id);
    //   citations.push("[" + index + "]" + citedFile.filename);
    // }
    index++;
  }

  console.log(text.value);
  console.log(citations.join("\n"));
}

console.log("Usage", JSON.stringify(run.usage, null, 2));
