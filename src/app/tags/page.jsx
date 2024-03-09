import Link from "next/link";
import { blogInit } from "/src/utils/blogInit";
import { slug } from "github-slugger";
import { sitename } from "/_config";

export const metadata = {
  title: `标签 ｜ ${sitename}`,
  description: `${sitename} 的所有标签。`,
  openGraph: {
    title: `标签 ｜ ${sitename}`,
    description: `${sitename} 的所有标签。`,
  },
};

export default async function Tags() {
  const posts = await blogInit();
  const allTagsWithCount = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (allTagsWithCount[tag]) {
        allTagsWithCount[tag]++;
      } else {
        allTagsWithCount[tag] = 1;
      }
    });
  });

  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">标签</h1>
      </div>
      <div className="flex flex-col gap-4">
        {Object.keys(allTagsWithCount).map((tag) => (
          <Link key={tag} href={"/tags/" + slug(tag)}>
            <div className="flex w-full justify-between rounded-lg border p-4">
              <span>{tag}</span>
              <span className="my-auto block text-sm text-black/60 dark:text-white/60">
                {allTagsWithCount[tag]} 篇
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
