import { Config, Effect, Layer, Schema } from "effect";
import { AiInput, AiToolkit, Completions } from "@effect/ai";
import {
  OpenAiClient,
  OpenAiCompletions,
  OpenAiConfig,
} from "@effect/ai-openai";
import { NodeHttpClient } from "@effect/platform-node";
import { SystemInstruction } from "@effect/ai/AiInput";
import { GetReleaseArguments } from "./function-tools.js";

export const OpenAiLive = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY"),
}).pipe(Layer.provide(NodeHttpClient.layerUndici));

export const CompletionsLive = OpenAiCompletions.layer({
  model: "gpt-4o",
}).pipe(Layer.provide(OpenAiLive));

const toolTest = {
  _tag: "test",
  success: Schema.String,
};

class ToolTest extends Schema.Class<ToolTest>("ToolTest")({}) {}
ToolTest;
type TToolTest = typeof ToolTest;
type A = TToolTest["Type"];
type B = TToolTest[Schema.TypeId];
type C = TToolTest["_tag"];
type D = TToolTest["success"];

export const ask = (prompt: string) =>
  Effect.gen(function* () {
    const completions = yield* Completions.Completions;
    const systemInput = AiInput.provideSystem(
      "You are a test assistant, whatever you respond is going to be ok"
    );
    // const toolkit = AiToolkit.empty.add(GetReleaseArguments.Type);
    const toolkit = AiToolkit.empty.add(ToolTest);
    const handlers = yield* toolkit;
    const response = yield* completions
      .toolkit({ input: prompt, tools: handlers })
      .pipe(
        systemInput,
        Effect.provideService(OpenAiConfig.OpenAiConfig, {
          model: "gpt-4o",
        })
      );
    // const response = yield* completions.create(prompt).pipe(
    //   systemInput,
    //   Effect.provideService(OpenAiConfig.OpenAiConfig, {
    //     model: "gpt-4o",
    //   })
    // );
    console.log(response);
    return response.response.text;
  });
