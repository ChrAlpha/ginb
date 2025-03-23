import PostList from "/src/components/PostList";
import { blogInit } from "/src/utils/blogInit";
import { sitename, description } from "/_config";

export const generateMetadata = ({ params: { page } }) => {
  return {
    title: `Page ${page}`,
    openGraph: {
      title: `Page ${page} | ${sitename}`,
      description: description,
      siteName: sitename,
      url: "/",
      type: "website",
    },
  };
};

export default async function Page({ params: { page } }) {
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
