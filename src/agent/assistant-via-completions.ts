import { Config, Effect, Layer } from "effect";
import { AiInput, Completions } from "@effect/ai";
import {
  OpenAiClient,
  OpenAiCompletions,
  OpenAiConfig,
} from "@effect/ai-openai";
import { NodeHttpClient } from "@effect/platform-node";

export const OpenAiLive = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY"),
}).pipe(Layer.provide(NodeHttpClient.layerUndici));

export const CompletionsLive = OpenAiCompletions.layer({
  model: "gpt-4o",
}).pipe(Layer.provide(OpenAiLive));

export const ask = (prompt: string) =>
  Effect.gen(function* () {
    const completions = yield* Completions.Completions;
    const systemInput = AiInput.provideSystem(
      "You are a test assistant, whatever you respond is going to be ok"
    );
    const response = yield* completions.create(prompt).pipe(
      systemInput,
      Effect.provideService(OpenAiConfig.OpenAiConfig, {
        model: "gpt-4o",
      })
    );
    return response.text;
  });
