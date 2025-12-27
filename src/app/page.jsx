import PostList from "/src/components/PostList";
import { blogInit } from "/src/lib/blog";
import { sitename, description } from "/_config";

export const metadata = {
  title: "Home | " + sitename,
  openGraph: {
    title: "Home | " + sitename,
    description: description,
    siteName: sitename,
    url: "/",
    type: "website",
  },
};

export default async function Page() {
  const posts = (await blogInit()).sort((a, b) => {
    if (a.tags.includes("Top") && !b.tags.includes("Top")) {
      return -1;
    }
    if (!a.tags.includes("Top") && b.tags.includes("Top")) {
      return 1;
    }
    return 0;
  });
  return <PostList base="/" current={1} posts={posts} />;
}
