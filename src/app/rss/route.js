import { blogInit } from "/src/utils/blogInit";
import { generateRssFeed } from "/src/utils/rssInit";

export async function GET(request) {
  const posts = await blogInit();
  const feed = generateRssFeed(posts);

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
