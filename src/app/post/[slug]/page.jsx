import PostContent from "/src/components/PostContent";
import { blogInit } from "/src/utils/blogInit";
import { notFound } from "next/navigation";
import { sitename, keywords } from "/_config";

export const generateMetadata = async ({ params: { slug } }) => {
  const posts = await blogInit();
  const post = posts.find((post) => post.slug == slug);
  if (!post) {
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
    title: `${post.title} | ${sitename}`,
    keywords: post.tags.concat(keywords),
    description: post.contentRaw.slice(0, 150),
    openGraph: {
      title: `${post.title} | ${sitename}`,
      description: post.contentRaw.slice(0, 150),
      type: "article",
    },
  };
};

export default async function PostPage({ params }) {
  const posts = await blogInit();
  const { slug } = params;
  const post = posts.find((post) => post.slug == slug);
  if (!post) {
    // 404 Not Found
    return notFound();
  }

  return (
    <PostContent
      title={post.title}
      created_at={post.created_at}
      updated_at={post.updated_at}
      contentRaw={post.contentRaw}
      tags={post.tags}
      slug={post.slug}
      path={post.path}
      comments={post.comments}
      html_url={post.html_url}
    />
  );
}
