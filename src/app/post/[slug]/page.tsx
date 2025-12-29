import PostContent from "/src/components/PostContent";
import { getPostBySlug } from "/src/lib/blog";
import { notFound } from "next/navigation";
import { sitename, keywords, username } from "/_config";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) {
    return {
      title: "404 Not Found",
      openGraph: {
        title: `404 Not Found | ${sitename}`,
      },
      robots: {
        index: false,
      },
    };
  }
  return {
    title: `${post.title}`,
    keywords: post.tags.concat(keywords),
    description: post.contentRaw.slice(0, 150),
    openGraph: {
      title: `${post.title} | ${sitename}`,
      description: post.contentRaw.slice(0, 150),
      siteName: sitename,
      url: "/",
      type: "article",
      authors: [username],
      tags: post.tags,
    },
  };
};

export default async function PostPage({ params }: PostPageProps) {
  "use cache";
  const { slug } = await params;
  cacheLife("hours");
  cacheTag("blog-posts", `post-${slug}`);

  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) {
    // 404 Not Found
    return notFound();
  }

  return (
    <PostContent
      title={post.title}
      created_at={post.created_at}
      contentRaw={post.contentRaw}
      tags={post.tags}
      comments={post.comments}
      html_url={post.html_url}
    />
  );
}
