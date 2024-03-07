import { Octokit } from "octokit";
import { cache } from "react";
import { username, repository } from "/_config";

export const blogInit = cache(async () => {
  function formatIssues(issues) {
    return issues.map((issue) => ({
      title: issue.title,
      slug: issue.number,
      path: `post/${issue.number}`,
      api: issue.url,
      html_url: issue.html_url,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      tags: issue.labels.map((label) => label.name),
      summary: issue.body.substring(0, 150),
      contentRaw: issue.body,
      comments: issue.comments,
      // content: <Markdown>{issue.body}</Markdown>,
    }));
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: username,
    repo: repository,
    per_page: 100,
  });

  return formatIssues(issues.filter((issue) => !issue.pull_request));
});
