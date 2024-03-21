import { ArchivesList } from "/src/components/ArchivesList";
import { getPostsByTag } from "/src/utils/blogInit";
import { notFound } from "next/navigation";
import { sitename, keywords } from "/_config";

export const generateMetadata = async ({ params: { tag } }) => {
  let tagName = "";
  const postsWithSpecTag = await getPostsByTag(decodeURIComponent(tag));
  if (!postsWithSpecTag) {
    return {
      title: `404 Not Found`,
      openGraph: {
        title: `404 Not Found | ${sitename}`,
      },
      robots: {
        index: false,
      },
    };
  }
  return {
    title: `Tag: ${tagName}`,
    description: `All posts including ${tagName} tag in ${sitename}.`,
    keywords: [tagName].concat(keywords),
    openGraph: {
      title: `Tag: ${tagName} | ${sitename}`,
      description: `All posts including ${tagName} tag in ${sitename}.`,
    },
  };
};

export default async function TagPage({ params: { tag } }) {
  const postsWithSpecTag = await getPostsByTag(decodeURIComponent(tag));
  if (postsWithSpecTag.length === 0) {
    // 404 Not Found
    return notFound();
  }

  return (
    <>
      {" "}
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">{decodeURIComponent(tag)}</h1>
        <span className="text-black/60 dark:text-white/60">
          {postsWithSpecTag.length} posts in total
        </span>
      </div>
      <ArchivesList posts={postsWithSpecTag} />
    </>
  );
}
