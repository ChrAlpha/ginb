import { ArchivesList } from "@/components/ArchivesList";
import { getPostsByTag } from "@/lib/blog";
import { notFound } from "next/navigation";
import { site } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export const generateMetadata = async ({ params }: TagPageProps): Promise<Metadata> => {
  const { tag } = await params;
  const postsWithSpecTag = await getPostsByTag(decodeURIComponent(tag));
  if (!postsWithSpecTag) {
    return {
      title: "404 Not Found",
      openGraph: {
        title: `404 Not Found | ${site.title}`,
      },
      robots: {
        index: false,
      },
    };
  }
  return {
    title: `Tag: ${decodeURIComponent(tag)}`,
    description: `All posts including ${decodeURIComponent(tag)} tag in ${site.title}.`,
    keywords: [decodeURIComponent(tag)].concat(site.keywords),
    openGraph: {
      title: `Tag: ${decodeURIComponent(tag)} | ${site.title}`,
      description: `All posts including ${decodeURIComponent(tag)} tag in ${site.title}.`,
    },
  };
};

export default async function TagPage({ params }: TagPageProps) {
  "use cache";
  const { tag } = await params;
  cacheLife("hours");
  cacheTag("blog-posts", `tag-${tag}`);

  const postsWithSpecTag = await getPostsByTag(decodeURIComponent(tag));
  if (postsWithSpecTag.length === 0) {
    return notFound();
  }

  return (
    <>
      <div className="Subhead">
        <h1 className="Subhead-heading">
          #
          {decodeURIComponent(tag)}
        </h1>
        <div className="Subhead-description color-fg-muted">
          {postsWithSpecTag.length}
          {" "}
          posts in total
        </div>
      </div>
      <ArchivesList posts={postsWithSpecTag} />
    </>
  );
}
