import Link from "next/link";
import { blogInit } from "@/lib/blog";
import { slug } from "github-slugger";
import { site } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

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
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">Tags</h1>
      </div>
      <div className="flex flex-col gap-4">
        {Object.keys(allTagsWithCount).map(tag => (
          <Link key={tag} href={"/tags/" + slug(tag)}>
            <div className="flex w-full justify-between rounded-lg border p-4">
              <span>{tag}</span>
              <span className={`
                my-auto block text-sm text-black/60
                dark:text-white/60
              `}
              >
                {allTagsWithCount[tag]}
                {" "}
                Posts
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
