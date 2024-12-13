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

export const ReleaseQuestionApiLive: Layer.Layer<
  HttpApiGroup.ApiGroup<"releases">,
  ConfigError,
  FileSystem.FileSystem
> = HttpApiBuilder.group(Api, "releases", (handlers) =>
  Effect.gen(function* () {
    const config = yield* getConfig;
    return (
      handlers
        // the parameters & payload are passed to the handler function.
        .handle("ask", ({ payload }) =>
          Effect.succeed(
            `Hello world ${payload.question} ${payload.format} ${config.owner} ${config.openAIApiKey}`
          )
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
  FileSystem.FileSystem
> = HttpApiBuilder.api(Api).pipe(Layer.provide(ReleaseQuestionApiLive));
