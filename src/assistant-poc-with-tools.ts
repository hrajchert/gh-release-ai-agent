import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI();

const functionsDef = [
  {
    name: "getAllReleases",
    description:
      "The function retrieves all release IDs, optionally filtered by a specified date range. The function returns an array of release ids sorted by release date. The first item in the array is the first release from the selected period.",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        from: {
          type: "string",
          description:
            "The starting date for filtering releases, in ISO 8601 format (YYYY-MM-DD).",
        },
        to: {
          type: "string",
          description:
            "The ending date for filtering releases, in ISO 8601 format (YYYY-MM-DD).",
        },
      },
      additionalProperties: false,
      required: ["from", "to"],
    },
  },
];
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

// const prompt = "How many releases are they?";
const prompt = "What is the latest release?";
// const prompt = "What is the first release?";
// const prompt = "Give me the fixes since version 3.11.0";

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

debugger;

if (run.status === "requires_action") {
  const toolOutputs = [
    {
      tool_call_id: run.required_action?.submit_tool_outputs.tool_calls[0].id,
      output: `[
        101320529, 101912603, 101981455, 102871459, 104348096, 107029593,
        107328740, 108833236, 109523099, 111056167, 111611254, 112912233,
        112936602, 113612746, 115702206, 117737209, 118525817, 121638248,
        123060702, 124773472, 126576805, 133483582, 135867530, 138405314,
        138419803, 139791851, 143560257, 144290192, 150024164, 151408890,
        154870766, 157402736, 157813204, 157879580, 160138391, 168006654,
        169982599, 170553885, 171248827, 173465837, 174792772, 176896337,
        177052879, 178403741, 179577172, 180724092, 181258760, 181308736,
        183097912, 183116409, 186920620, 49424425, 49496162, 49498456, 49500500,
        49521191, 49550881, 49560795, 49561796, 50031606, 50417485, 51102203,
        51548009, 51550866, 51929018, 58908358, 62259937, 65064627, 73699976,
        75482055, 77899925, 79302118, 80115376, 82302538, 84114188, 84117856,
        88470471, 90023555, 90465883, 90535191, 91286430, 92386944, 94121665,
        95110860, 95603988, 97105779, 98912364,
      ]`,
    },
  ];
  run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
    thread.id,
    run.id,
    { tool_outputs: toolOutputs }
  );
}
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
