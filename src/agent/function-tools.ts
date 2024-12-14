import { Effect, Schema, pipe, JSONSchema } from "effect";
import { FileSystem } from "@effect/platform";
import { ensureDbDirectory } from "../indexer.js";
import { GHReleaseAgentConfig } from "../config.js";

class GetReleaseArguments extends Schema.Class<GetReleaseArguments>(
  "GetReleaseArguments"
)({
  tag: Schema.String.annotations({ description: "The tag of a release" }),
}) {}

// TODO: Move GHReleaseAgentConfig to the Requirements.
export const getRelease = (args: unknown, config: GHReleaseAgentConfig) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const dbDirectory = yield* ensureDbDirectory(config);

    const { tag } = yield* Schema.decodeUnknown(GetReleaseArguments)(args);

    const release = yield* pipe(
      fs.readFileString(`${dbDirectory}/${tag}.md`),
      Effect.orElse(() =>
        Effect.succeed(`I could not find info for release ${tag}`)
      )
    );
  });

class ReleasesIndexElement extends Schema.Class<ReleasesIndexElement>(
  "ReleasesIndexElement"
)({
  tag_name: Schema.Array(Schema.String),
  published_at: Schema.String,
  id: Schema.Number,
  html_url: Schema.String,
}) {}

export const getAllReleases = (config: GHReleaseAgentConfig) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const dbDirectory = yield* ensureDbDirectory(config);

    const releases = yield* fs.readFileString(`${dbDirectory}/index.json`);

    const releaseIndex = yield* Schema.decodeUnknown(
      Schema.Array(ReleasesIndexElement)
    )(releases);

    return releaseIndex
      .map(
        (release) =>
          `- ${release.tag_name} published on ${release.published_at}`
      )
      .join("\n");
  });

// console.log(JSON.stringify(JSONSchema.make(GetReleaseArguments), null, 2));
