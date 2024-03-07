import PostContent from "/src/components/PostContent";
import { blogInit } from "/src/utils/blogInit";
import { notFound } from "next/navigation";

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
