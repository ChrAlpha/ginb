import PostList from "/src/components/PostList";
import { blogInit } from "/src/lib/blog";
import { site } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ page: string }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { page } = await params;
  return {
    title: `Page ${page}`,
    openGraph: {
      title: `Page ${page} | ${site.title}`,
      description: site.description,
      siteName: site.title,
      url: "/",
      type: "website",
    },
  };
};

export default async function Page({ params }: PageProps) {
  "use cache";
  const { page } = await params;
  cacheLife("hours");
  cacheTag("blog-posts", `page-${page}`);

  const posts = (await blogInit()).sort((a, b) => {
    if (a.tags.includes("Top") && !b.tags.includes("Top")) {
      return -1;
    }
    if (!a.tags.includes("Top") && b.tags.includes("Top")) {
      return 1;
    }
    return 0;
  });
  return <PostList base="/" current={parseInt(page)} posts={posts} />;
}
