import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
} from "@effect/platform";
import { DateTime, Effect, Layer, Schema } from "effect";

import { Api } from "./api.js";
import { getConfig } from "../config.js";
import { ConfigError } from "effect/ConfigError";

export const ReleaseQuestionApiLive: Layer.Layer<
  HttpApiGroup.ApiGroup<"releases">,
  ConfigError
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
        .handle("index", () => Effect.succeed({ releases: 2 }))
    );
  })
);

export const ApiLive: Layer.Layer<HttpApi.Api, ConfigError> =
  HttpApiBuilder.api(Api).pipe(Layer.provide(ReleaseQuestionApiLive));
