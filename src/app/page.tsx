import PostList from "@/components/PostList";
import { blogInit } from "@/lib/blog";
import { site } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | " + site.title,
  openGraph: {
    title: "Home | " + site.title,
    description: site.description,
    siteName: site.title,
    url: "/",
    type: "website",
  },
};

export default async function Page() {
  "use cache";
  cacheLife("hours");
  cacheTag("home-page");

  const posts = (await blogInit()).sort((a, b) => {
    if (a.tags.includes("Top") && !b.tags.includes("Top")) {
      return -1;
    }
    if (!a.tags.includes("Top") && b.tags.includes("Top")) {
      return 1;
    }
    return 0;
  });
  return <PostList base="/" current={1} posts={posts} />;
}
