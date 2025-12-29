import { blogInit } from "/src/lib/blog";
import { ArchivesList } from "/src/components/ArchivesList";
import { sitename } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archives",
  description: `Archive all posts in ${sitename}.`,
  openGraph: {
    title: `Archives | ${sitename}`,
    description: `Archive all posts in ${sitename}.`,
    siteName: sitename,
    url: "/",
    type: "website",
  },
};

export default async function Archives() {
  "use cache";
  cacheLife("hours");
  cacheTag("archives-page");

  const posts = await blogInit();

  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">Archives</h1>
        <span className="text-black/60 dark:text-white/60">
          {posts.length}
          {" "}
          Posts in total
        </span>
      </div>
      <ArchivesList posts={posts} />
    </>
  );
}
