import Link from "next/link";
import { blogInit } from "/src/utils/blogInit";
import { slug } from "github-slugger";

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
    <div className="md:flex-1">
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">标签</h1>
      </div>
      <div className="flex flex-col gap-4">
        {Object.keys(allTagsWithCount).map((tag) => (
          <Link href={"/tags/" + slug(tag)}>
            <div
              className="flex justify-between rounded-lg border w-full p-4"
              key={tag}
            >
              <span>{tag}</span>
              <span className="block my-auto text-sm text-black/60 dark:text-white/60">
                {allTagsWithCount[tag]} 篇
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
