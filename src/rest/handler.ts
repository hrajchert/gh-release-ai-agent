import {
  FileSystem,
  HttpApi,
  HttpApiBuilder,
  HttpApiGroup,
} from "@effect/platform";
import { Effect, Layer } from "effect";

import { Api } from "./api.js";
import { getConfig } from "../config.js";
import { ConfigError } from "effect/ConfigError";
import { indexRepository } from "../indexer.js";
import { ask } from "../agent/assistant-via-completions.js";
import { Completions } from "@effect/ai";

export const ReleaseQuestionApiLive: Layer.Layer<
  HttpApiGroup.ApiGroup<"api", "releases">,
  ConfigError,
  FileSystem.FileSystem | Completions.Completions
> = HttpApiBuilder.group(Api, "releases", (handlers) =>
  Effect.gen(function* () {
    const config = yield* getConfig;
    return (
      handlers
        // the parameters & payload are passed to the handler function.
        .handle(
          "ask",
          ({ payload }) =>
            Effect.gen(function* () {
              const response = yield* Effect.orDie(ask(payload.question));
              return response;
            })
          // Effect.succeed(
          //   `Hello world2 ${payload.question} ${payload.format} ${config.owner} ${config.openAIApiKey}`
          // )
        )
        .handle("index", () =>
          Effect.gen(function* () {
            const releaseIndex = yield* Effect.orDie(indexRepository(config));
            return { releases: releaseIndex.length };
          })
        )
    );
  })
);

export const ApiLive: Layer.Layer<
  HttpApi.Api,
  ConfigError,
  FileSystem.FileSystem | Completions.Completions
> = HttpApiBuilder.api(Api).pipe(Layer.provide(ReleaseQuestionApiLive));
