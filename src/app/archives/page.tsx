import { blogInit } from "@/lib/blog";
import { ArchivesList } from "@/components/ArchivesList";
import { site } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archives",
  description: `Archive all posts in ${site.title}.`,
  openGraph: {
    title: `Archives | ${site.title}`,
    description: `Archive all posts in ${site.title}.`,
    siteName: site.title,
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
      <div className="Subhead">
        <h1 className="Subhead-heading">Archives</h1>
        <div className="Subhead-description color-fg-muted">
          {posts.length}
          {" "}
          posts in total
        </div>
      </div>
      <ArchivesList posts={posts} />
    </>
  );
}
