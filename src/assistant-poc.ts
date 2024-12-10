import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI();

const assistant = await openai.beta.assistants.create({
  name: "dirty test superwall",
  instructions: `
    You are an assistant that provides information of the releases of the superwall/Superwall-iOS github project. 
    
    Write the responses in Markdown and when you include a version in the text always add it as a link.

    When you give information about something that was released, make sure to always include the version when it was released?`,
  model: "gpt-4o",
  tools: [{ type: "file_search" }],
});

// V1 first 30 results in one file
// releases-with-description.md
const vector_store_ids = ["vs_8hZxp451ZfPE0Em1EPZlDhHF"];

await openai.beta.assistants.update(assistant.id, {
  tool_resources: {
    file_search: { vector_store_ids },
  },
});

const thread = await openai.beta.threads.create({
  messages: [
    {
      role: "user",
      content: "Give me the fixes since version 3.11.0",
    },
  ],
});

debugger;

const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
  assistant_id: assistant.id,
});

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
