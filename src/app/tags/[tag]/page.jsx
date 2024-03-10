import { ArchivesList } from "/src/components/ArchivesList";
import { blogInit } from "/src/utils/blogInit";
import { notFound } from "next/navigation";
import { slug } from "github-slugger";
import { sitename, keywords } from "/_config";

export const generateMetadata = async ({ params: { tag } }) => {
  const posts = await blogInit();
  let tagName = "";
  const postSpecTag = posts.filter((post) =>
    post.tags.some((t) => {
      if (slug(t) === tag) {
        tagName = t;
        return true;
      }
      return false;
    }),
  );
  if (!postSpecTag) {
    return {
      title: `404 Not Found | ${sitename}`,
      openGraph: {
        title: `404 Not Found | ${sitename}`,
      },
      robots: {
        index: false,
      },
    };
  }
  return {
    title: `Tag: ${tagName} | ${sitename}`,
    description: `All posts including ${tagName} tag in ${sitename}.`,
    keywords: [tagName].concat(keywords),
    openGraph: {
      title: `Tag: ${tagName} | ${sitename}`,
      description: `All posts including ${tagName} tag in ${sitename}.`,
    },
  };
};

export default async function TagPage({ params: { tag } }) {
  const posts = await blogInit();
  let tagName = "";
  const postSpecTag = posts.filter((post) =>
    post.tags.some((t) => {
      if (slug(t) === tag) {
        tagName = t;
        return true;
      }
      return false;
    }),
  );
  if (!postSpecTag) {
    // 404 Not Found
    return notFound();
  }

  return (
    <>
      {" "}
      <div className="w-full p-4">
        <h1 className="text-3xl font-semibold">{tagName}</h1>
        <span className="text-black/60 dark:text-white/60">
          {postSpecTag.length} posts in total
        </span>
      </div>
      <ArchivesList posts={postSpecTag} />
    </>
  );
}
