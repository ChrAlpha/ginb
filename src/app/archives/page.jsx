import { blogInit } from "/src/utils/blogInit";
import { ArchivesList } from "/src/components/ArchivesList";
import { sitename } from "/_config";

export const metadata = {
  title: `归档 ｜ ${sitename}`,
  descriptopn: `归档 ${sitename} 的所有文章。`,
  openGraph: {
    title: `归档 ｜ ${sitename}`,
    descriptopn: `归档 ${sitename} 的所有文章。`,
  },
};

export default async function Archives() {
  const posts = await blogInit();

  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">归档</h1>
        <span className="text-black/60 dark:text-white/60">
          共 {posts.length} 篇文章
        </span>
      </div>
      <ArchivesList posts={posts} />
    </>
  );
}
