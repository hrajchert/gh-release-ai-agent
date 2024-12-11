import { Octokit, App } from "octokit";
import * as fs from "fs";

const octokit = new Octokit();

const iterator = octokit.paginate.iterator(octokit.rest.repos.listReleases, {
  owner: "superwall",
  repo: "Superwall-iOS",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
  per_page: 50,
});

let body = "# Releases\n\n";
const filename = `tests/superwall-releases/v2/releases-with-description.md`;
for await (const { data: releases } of iterator) {
  debugger;
  for (const release of releases) {
    const releaseName = [
      release.tag_name,
      release.name === release.tag_name ? null : release.name,
    ]
      .filter(Boolean)
      .join(" - ");
    body += `## ${releaseName}\n\n`;
    body += "### Release info\n";
    body += `**URL**: ${release.html_url}\n`;
    body += `**Author**: ${release.author.login}\n`;
    body += `**Published at**: ${release.published_at}\n\n`;
    body += `${release.body}\n\n`;
  }
}
fs.writeFileSync(filename, body);
