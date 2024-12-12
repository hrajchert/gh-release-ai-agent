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
    const release = fs.readFileSync(`tests/superwall-releases/v3/${tag}.md`, {
      encoding: "utf8",
    });
    return release;
  } catch {
    return "I could not find info for release " + tag;
  }
}
function getAllReleases() {
  return `- 3.12.0 published on 2024-11-22T14:10:49Z
- 3.11.3 published on 2024-11-01T14:53:46Z
- 3.11.2 published on 2024-11-01T13:03:50Z
- 3.11.1 published on 2024-10-22T20:06:34Z
- 3.11.0 published on 2024-10-22T15:19:02Z
- 3.10.2 published on 2024-10-18T16:21:46Z
- 3.10.1 published on 2024-10-11T17:16:03Z
- 3.10.0 published on 2024-10-04T13:02:31Z
- 3.9.1 published on 2024-09-26T12:18:57Z
- 3.9.0 published on 2024-09-25T16:45:35Z
- 3.8.0 published on 2024-09-12T15:28:27Z
- 3.7.4 published on 2024-09-04T16:12:39Z
- 3.7.3 published on 2024-08-21T11:14:56Z
- 3.7.2 published on 2024-08-16T14:35:16Z
- 3.7.1 published on 2024-08-13T14:20:07Z
- 3.7.0 published on 2024-07-31T09:40:15Z
- 3.6.6 published on 2024-06-12T17:05:09Z
- 3.6.5 published on 2024-05-28T21:40:49Z
- 3.6.4 published on 2024-05-28T14:44:29Z
- 3.6.3 published on 2024-05-24T19:13:33Z
- 3.6.2 published on 2024-05-09T02:23:52Z
- 3.6.1 published on 2024-04-16T16:48:44Z
- 3.6.0 published on 2024-04-05T22:58:13Z
- 3.5.0 published on 2024-02-29T23:47:17Z
- 3.5.0-rc.3 published on 2024-02-26T04:26:55Z
- 3.5.0-rc.1 published on 2024-02-04T01:18:44Z
- 3.4.8 published on 2024-01-24T22:02:54Z
- 3.4.7 published on 2024-01-24T20:33:01Z
- 3.4.6 published on 2024-01-04T18:02:59Z
- 3.4.5 published on 2023-12-11T21:49:08Z
- 3.4.4 published on 2023-10-25T10:31:12Z
- 3.4.3 published on 2023-10-12T08:08:01Z
- 3.4.2 published on 2023-09-29T03:16:42Z
- 3.4.0 published on 2023-09-19T06:52:56Z
- 3.3.2 published on 2023-08-24T09:37:07Z
- 3.3.1 published on 2023-08-18T09:18:22Z
- 3.3.0 published on 2023-08-09T03:49:34Z
- 3.2.2 published on 2023-07-26T06:05:20Z
- 3.2.1 published on 2023-07-20T09:33:10Z
- 3.2.0 published on 2023-07-20T05:57:03Z
- 3.1.1 published on 2023-07-10T10:55:44Z
- 3.1.0 published on 2023-07-05T04:45:07Z
- 3.0.3 published on 2023-06-22T10:02:37Z
- 3.0.2 published on 2023-06-16T07:42:13Z
- 3.0.1 published on 2023-06-05T10:42:08Z
- 3.0.0 published on 2023-06-04T09:33:38Z
- 3.0.0-rc.7 published on 2023-05-26T05:07:20Z
- 3.0.0-rc.6 published on 2023-05-13T14:02:14Z
- 3.0.0-rc.5 published on 2023-05-05T09:16:24Z
- 3.0.0-rc.4 published on 2023-05-04T17:25:56Z
- 3.0.0-rc.3 published on 2023-04-28T18:16:43Z
- 3.0.0-rc.2 published on 2023-04-11T12:26:01Z
- 3.0.0-rc.1 published on 2023-03-28T02:35:34Z
- 3.0.0-beta.8 published on 2023-03-14T18:24:29Z
- 3.0.0-beta.7 published on 2023-03-09T18:00:56Z
- 3.0.0-beta.6 published on 2023-03-01T17:37:29Z
- 3.0.0-beta.5 published on 2023-02-14T16:12:28Z
- 3.0.0-beta.4 published on 2023-02-03T16:07:48Z
- 3.0.0-beta.3 published on 2023-01-28T19:14:37Z
- 3.0.0-beta.2 published on 2023-01-27T18:58:04Z
- 3.0.0-beta.1 published on 2023-01-24T10:41:11Z
- 2.5.8 published on 2023-01-10T16:15:59Z
- 2.5.6 published on 2022-11-24T16:20:44Z
- 2.5.5 published on 2022-11-24T15:39:41Z
- 2.5.4 published on 2022-11-07T18:21:47Z
- 2.5.3 published on 2022-10-17T17:26:13Z
- 2.5.2 published on 2022-10-07T19:30:46Z
- 2.5.0 published on 2022-09-22T15:45:05Z
- 2.4.1 published on 2022-08-26T15:36:03Z
- 2.4.0 published on 2022-08-04T20:08:03Z
- 2.3.0 published on 2022-04-22T15:00:27Z
- 2.2.10 published on 2022-03-20T01:27:11Z
- 2.2.7 published on 2022-02-07T16:01:02Z
- 2.0.3 published on 2021-10-24T11:36:25Z
- 2.0.2 published on 2021-10-18T15:32:50Z
- 2.0.0 published on 2021-10-18T14:54:59Z
- 1.0.14 published on 2021-10-10T16:12:15Z
- 1.0.13 published on 2021-09-28T18:13:57Z
- 1.0.11 published on 2021-09-22T05:47:58Z
- 1.0.10 published on 2021-09-14T22:04:16Z
- 1.0.9 published on 2021-09-14T21:40:56Z
- 1.0.8 published on 2021-09-14T18:40:36Z
- 1.0.7 published on 2021-09-14T11:40:07Z
- 1.0.6 published on 2021-09-14T04:46:26Z
- 1.0.5 published on 2021-09-14T03:30:01Z
- 1.0.3 published on 2021-09-14T02:12:43Z
- 1.0.2 published on 2021-09-13T01:15:52Z`;
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

const assistant = await openai.beta.assistants.create({
  name: "dirty test superwall with tools",
  instructions: `
    You are an assistant that provides information of the releases of the superwall/Superwall-iOS github project. 
    
    Write the responses in Markdown and when you include a version in the text always add it as a link.

    When you give information about something that was released, make sure to always include the version when it was released?`,
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
