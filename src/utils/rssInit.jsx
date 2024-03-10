import { Feed } from "feed";
import { cache } from "react";
import { sitename, username, description, url } from "/_config";

export const generateRssFeed = cache((posts) => {
  const feed = new Feed({
    title: sitename,
    description: description,
    id: url,
    link: url,
    feedLinks: {
      rss2: `${url}/feed`,
    },
    author: {
      name: username,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: `${url}/post/${post.slug}`,
      description: post.summary,
      content: post.content,
      date: new Date(post.created_at),
    });
  });

  return feed.rss2();
});
