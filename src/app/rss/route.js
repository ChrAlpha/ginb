import { blogInit } from "/src/lib/blog";
import { generateRssFeed } from "/src/lib/rss";

export async function GET() {
  const posts = await blogInit();
  const feed = generateRssFeed(posts);

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
      "CDN-Cache-Control": "max-age=86400",
      "Vercel-CDN-Cache-Control": "max-age=86400",
    },
  });
}
