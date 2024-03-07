import PostList from "/src/components/PostList";
import { blogInit } from "/src/utils/blogInit";
import { sitename } from "/_config";

export const metadata = {
  title: "首页 ｜ " + sitename,
  alternates: {
    canonical: "/",
  },
};

export default async function Page({ params }) {
  const posts = (await blogInit()).sort((a, b) => {
    if (a.tags.includes("Top") && !b.tags.includes("Top")) {
      return -1;
    }
    if (!a.tags.includes("Top") && b.tags.includes("Top")) {
      return 1;
    }
    return 0;
  });
  return <PostList base={"/"} current={parseInt(params.page)} posts={posts} />;
}
