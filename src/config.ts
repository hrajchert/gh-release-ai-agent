import { Effect, Config } from "effect";

export const getConfig = Effect.gen(function* () {
  const repo = yield* Config.string("REPO");
  const owner = yield* Config.string("OWNER");
  const openAIApiKey = yield* Config.redacted("OPENAI_API_KEY");
  return { repo, owner, openAIApiKey };
});
