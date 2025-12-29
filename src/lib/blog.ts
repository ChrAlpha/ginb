import { Octokit } from "octokit";
import { cacheLife, cacheTag } from "next/cache";
import { slug as slugger } from "github-slugger";
import { username, repository } from "/_config";
import type { Post } from "/src/types";

interface GitHubIssue {
  title: string;
  number: number;
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  labels: { name: string }[];
  body: string;
  comments: number;
  pull_request?: unknown;
}

export async function blogInit(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");

  const formatIssues = (issues: GitHubIssue[]): Post[] => {
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
  }) as GitHubIssue[];

  return formatIssues(issues.filter(issue => !issue.pull_request));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts", `post-${slug}`);

  const posts = await blogInit();
  return posts.find(post => slugger(post.slug) === slugger(slug));
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts", `tag-${tag}`);

  const posts = await blogInit();
  return posts.filter(post => post.tags.some(t => slugger(t) === slugger(tag)));
}
