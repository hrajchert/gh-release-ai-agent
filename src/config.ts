import { Effect, Config } from "effect";

export type GHReleaseAgentConfig = Effect.Effect.Success<typeof getConfig>;

export const getConfig = Effect.gen(function* () {
  const repo = yield* Config.string("REPO");
  const owner = yield* Config.string("OWNER");
  const openAIApiKey = yield* Config.redacted("OPENAI_API_KEY");
  return { repo, owner, openAIApiKey };
});
