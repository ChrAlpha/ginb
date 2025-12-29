import { Feed } from "feed";
import { cache } from "react";
import { site, github, url } from "/_config";
import type { Post } from "@/types";

export const generateRssFeed = cache((posts: Post[]): string => {
  const feed = new Feed({
    title: site.title,
    description: site.description,
    id: url,
    link: url,
    feedLinks: {
      rss2: `${url}/feed`,
    },
    author: {
      name: github.owner,
    },
    copyright: "",
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.id || post.slug,
      link: `${url}/post/${post.slug}`,
      description: post.summary,
      content: post.content,
      date: new Date(post.created_at),
    });
  });

  return feed.rss2();
});
