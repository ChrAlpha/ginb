import Link from "next/link";
import { blogInit } from "@/lib/blog";
import { slug } from "github-slugger";
import { site } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { TagIcon } from "@primer/octicons-react";

export const metadata: Metadata = {
  title: "Tags",
  description: `All tags in posts of ${site.title}.`,
  openGraph: {
    title: `Tags | ${site.title}`,
    description: `All tags in posts of ${site.title}.`,
    siteName: site.title,
    url: "/",
    type: "website",
  },
};

export default async function Tags() {
  "use cache";
  cacheLife("hours");
  cacheTag("tags-page");

  const posts = await blogInit();
  const allTagsWithCount: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (allTagsWithCount[tag]) {
        allTagsWithCount[tag]++;
      }
      else {
        allTagsWithCount[tag] = 1;
      }
    });
  });

  return (
    <>
      <div className="Subhead">
        <h1 className="Subhead-heading">Tags</h1>
      </div>
      <div className="Box">
        {Object.keys(allTagsWithCount).map(tag => (
          <Link key={tag} href={"/tags/" + slug(tag)} className="Box-row d-flex flex-items-center flex-justify-between">
            <span className="d-flex flex-items-center">
              <TagIcon size={16} className="mr-2 color-fg-muted" />
              {tag}
            </span>
            <span className="Counter">{allTagsWithCount[tag]}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
