import { blogInit } from "/src/utils/blogInit";
import { ArchivesList } from "/src/components/ArchivesList";
import { sitename } from "/_config";

export const metadata = {
  title: `Archives`,
  siteName: sitename,
  descriptopn: `Archive all posts in ${sitename}.`,
  openGraph: {
    title: `Archives | ${sitename}`,
    descriptopn: `Archive all posts in ${sitename}.`,
    siteName: sitename,
    url: "/",
    type: "website",
  },
};

export default async function Archives() {
  const posts = await blogInit();

  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">Archives</h1>
        <span className="text-black/60 dark:text-white/60">{posts.length} Posts in total</span>
      </div>
      <ArchivesList posts={posts} />
    </>
  );
}
