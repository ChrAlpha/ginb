import Link from "next/link";
import { slug } from "github-slugger";
import { memo } from "react";
import { post_per_page } from "/_config";
import { notFound } from "next/navigation";

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date(date));
};

export const PostCard = memo(
  async ({ title, created_at, summary, path, tags, html_url, comments }) => {
    return (
      <div className="flex size-full flex-col gap-4 rounded-lg border p-4">
        <h2 className="text-2xl">
          <Link href={"/" + path}>{title}</Link>
        </h2>
        <p className="flex-1 text-black/60 dark:text-white/60">{summary}</p>
        <div className="flex justify-between">
          <div className="text-sm text-black/60 dark:text-white/60">
            <span>{formatDate(created_at)}</span>
            {tags?.length > 0
              && tags.map(tag => (
                <>
                  <span className="px-1">·</span>
                  <Link
                    className="hover:text-black dark:hover:text-white"
                    href={"/tags/" + slug(tag)}
                  >
                    {tag}
                  </Link>
                </>
              ))}
          </div>
          {comments > 0 && (
            <div className="text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
              <Link className="flex flex-row" href={html_url} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="my-auto size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {comments}
                  {" "}
                  Comments
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export const PageNav = memo(async ({ current, prev, prev_link, next, next_link, total }) => {
  let prevProps = {};
  let nextProps = {};
  if (prev && prev != 0) {
    prevProps.name = Link;
    prevProps.className
      = "flex flex-row gap-2 rounded-lg border border-transparent hover:border-current p-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white";
    prevProps.href = prev_link;
  }
  else {
    prevProps.name = "div";
    prevProps.className = "flex flex-row gap-2 rounded-lg p-2 invisible";
  }
  if (next && next != 0 && next <= total) {
    nextProps.name = Link;
    nextProps.className
      = "flex flex-row gap-2 rounded-lg border border-transparent hover:border-current p-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white";
    nextProps.href = next_link;
  }
  else {
    nextProps.name = "div";
    nextProps.className = "flex flex-row gap-2 rounded-lg p-2 invisible";
  }
  return (
    <>
      <div className="mt-4 flex flex-row justify-between">
        <prevProps.name {...prevProps}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Prev</span>
        </prevProps.name>
        <span className="p-2">
          {current}
          {" "}
          /
          {total}
        </span>
        <nextProps.name {...nextProps}>
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M12.207 2.232a.75.75 0 0 0 .025 1.06l4.146 3.958H6.375a5.375 5.375 0 0 0 0 10.75H9.25a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z"
              clipRule="evenodd"
            />
          </svg>
        </nextProps.name>
      </div>
    </>
  );
});

const PostList = async ({ base, current = 1, posts }) => {
  const pageNumber = current;
  const currentPosts = posts.slice(post_per_page * (pageNumber - 1), post_per_page * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.max(Math.ceil(posts.length / post_per_page), 1),
  };
  if (currentPosts.length === 0) {
    return notFound();
  }
  return (
    <>
      <ul className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2">
        {currentPosts.map(post => (
          <li key={post.slug}>
            <PostCard
              title={post.title}
              created_at={post.created_at}
              summary={post.summary}
              path={post.path}
              html_url={post.html_url}
              tags={post.tags}
              comments={post.comments}
            />
          </li>
        ))}
      </ul>
      <PageNav
        current={pagination.currentPage}
        prev={pagination.currentPage - 1}
        prev_link={
          pagination.currentPage - 1 > 1 ? `${base}page/${pagination.currentPage - 1}` : base
        }
        next={pagination.currentPage + 1}
        next_link={`${base}page/${pagination.currentPage + 1}`}
        total={pagination.totalPages}
      />
    </>
  );
};

export default memo(PostList);
