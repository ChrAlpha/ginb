import { Octokit } from "octokit";
import { cache } from "react";
import { slug as slugger } from "github-slugger";
import { username, repository } from "/_config";

export const blogInit = cache(async () => {
  const formatIssues = (issues) => {
    return issues.map(issue => ({
      title: issue.title,
      slug: slugger(String(issue.number)),
      path: `post/${slugger(String(issue.number))}`,
      api: issue.url,
      html_url: issue.html_url,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      tags: issue.labels.map(label => label.name),
      summary: issue.body.substring(0, 150),
      contentRaw: issue.body,
      comments: issue.comments,
      // content: <Markdown>{issue.body}</Markdown>,
    }));
  };

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: username,
    repo: repository,
    creator: username,
    per_page: 100,
  });

  return formatIssues(issues.filter(issue => !issue.pull_request));
});

export const getPostBySlug = cache(async (slug) => {
  const posts = await blogInit();
  return posts.find(post => slugger(post.slug) === slugger(slug));
});

export const getPostsByTag = cache(async (tag) => {
  const posts = await blogInit();
  return posts.filter(post => post.tags.some(t => slugger(t) === slugger(tag)));
});
