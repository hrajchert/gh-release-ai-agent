import { Console, Effect, Stream, pipe, Data } from "effect";
import { FileSystem } from "@effect/platform";

import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";

import { GHReleaseAgentConfig } from "./config.js";

type ListReleasesResponse =
  Endpoints["GET /repos/{owner}/{repo}/releases"]["response"]["data"];

type GithubRelease = ListReleasesResponse[0];

const getReleaseName = (release: GithubRelease) =>
  [release.tag_name, release.name === release.tag_name ? null : release.name]
    .filter(Boolean)
    .join(" - ");

const releaseAsMarkdown = (release: GithubRelease) => {
  const releaseName = getReleaseName(release);
  return `## Release ${releaseName}
**URL**: ${release.html_url}
**Author**: ${release.author.login}
**Published at**: ${release.published_at}
${release.body}

`;
};

// TODO: Move GHReleaseAgentConfig to the Requirements.
export const ensureDbDirectory = (config: GHReleaseAgentConfig) =>
  Effect.gen(function* () {
    const dbDirectory = `db/${config.owner}/${config.repo}/`;
    const fs = yield* FileSystem.FileSystem;
    const exists = yield* fs.exists(dbDirectory);
    if (!exists) {
      yield* fs.makeDirectory(dbDirectory, { recursive: true });
    }
    return dbDirectory;
  });

type ReleaseIndexElement = Pick<
  GithubRelease,
  "tag_name" | "published_at" | "id" | "html_url"
>;

export class OctokitListError extends Data.TaggedError("OctokitListError")<{
  error: unknown;
}> {}

export const indexRepository = (config: GHReleaseAgentConfig) =>
  Effect.gen(function* () {
    const octokit = new Octokit();
    const fs = yield* FileSystem.FileSystem;

    const dbDirectory = yield* ensureDbDirectory(config);
    const releaseIndex = yield* pipe(
      // Fetch all release ([releases page 1] + [releases page 2] + ...)
      Stream.fromAsyncIterable(
        octokit.paginate.iterator(octokit.rest.repos.listReleases, {
          owner: config.owner,
          repo: config.repo,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          per_page: 50,
        }),
        (e) => new OctokitListError({ error: e })
      ),
      // Expand the pages to a stream of individual releases.
      Stream.mapConcat((releases) => releases.data),
      // Index each release.
      Stream.runFoldEffect(
        [] as ReleaseIndexElement[],
        (releaseIndex, release) =>
          Effect.gen(function* () {
            Console.log(release.body);

            yield* fs.writeFileString(
              `${dbDirectory}/${release.tag_name}.md`,
              releaseAsMarkdown(release)
            );

            return [
              ...releaseIndex,
              {
                tag_name: release.tag_name,
                published_at: release.published_at,
                id: release.id,
                html_url: release.html_url,
              },
            ];
          })
      )
    );

    yield* fs.writeFileString(
      `${dbDirectory}/index.json`,
      JSON.stringify(releaseIndex, null, 2)
    );
    return releaseIndex;
  });
//
