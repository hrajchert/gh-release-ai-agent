import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  OpenApi,
} from "@effect/platform";
import { DateTime, Effect, Layer, Schema } from "effect";

class QuestionRequest extends Schema.Class<QuestionRequest>("QuestionRequest")({
  question: Schema.String.annotations({
    description: "A human readable question about the repository",
    examples: ["what is the latest release?"],
  }),
  format: Schema.optional(
    Schema.Literal("html", "markdown", "plain")
  ).annotations({
    description: "How do you want the response to be formatted",
  }),
}) {}

class IndexResponse extends Schema.Class<IndexResponse>("IndexResponse")({
  releases: Schema.Number.annotations({
    description: "The number of releases that were indexed",
  }),
}) {}

export class ReleaseQuestionApi extends HttpApiGroup.make("releases")
  .add(
    HttpApiEndpoint.post("ask")`/releases/ask`
      .addSuccess(Schema.String)
      .setPayload(QuestionRequest)
  )
  .add(
    HttpApiEndpoint.post("index")`/releases/index`.addSuccess(IndexResponse)
  ) {}

export class Api extends HttpApi.empty.add(ReleaseQuestionApi).annotateContext(
  OpenApi.annotations({
    title: "GitHub Release AI Agent",
    description: "API to ask questions to an LLM for a project. ",
  })
) {}
