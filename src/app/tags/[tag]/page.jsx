import { ArchivesList } from "/src/components/ArchivesList";
import { blogInit } from "/src/utils/blogInit";
import { notFound } from "next/navigation";
import { slug } from "github-slugger";

export default async function TagPage({ params }) {
  const posts = await blogInit();
  const { tag } = params;
  const postSpecTag = posts.filter((post) =>
    post.tags.map((t) => slug(t)).includes(decodeURIComponent(tag))
  );
  if (!postSpecTag) {
    // 404 Not Found
    return notFound();
  }

  return (
    <>
      {" "}
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">{decodeURIComponent(tag)}</h1>
        <span className="text-black/60 dark:text-white/60">
          共 {postSpecTag.length} 篇文章
        </span>
      </div>
      <ArchivesList posts={postSpecTag} />
    </>
  );
}
