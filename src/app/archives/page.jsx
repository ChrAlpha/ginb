import { blogInit } from "/src/utils/blogInit";
import { ArchivesList } from "/src/components/ArchivesList";

export default async function Archives() {
  const posts = await blogInit();

  return (
    <div className="md:flex-1">
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">归档</h1>
        <span className="text-black/60 dark:text-white/60">
          共 {posts.length} 篇文章
        </span>
      </div>
      <ArchivesList posts={posts} />
    </div>
  );
}
