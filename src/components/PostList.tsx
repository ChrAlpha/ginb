import Link from "next/link";
import { slug } from "github-slugger";
import { memo } from "react";
import { pagination } from "/_config";
import { notFound } from "next/navigation";
import type { Post } from "@/types";
import { CommentIcon, ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatter.format(new Date(date));
};

interface PostCardProps {
  title: string;
  created_at: string;
  summary: string;
  path: string;
  tags: string[];
  html_url: string;
  comments: number;
}

export const PostCard = memo(
  async ({ title, created_at, summary, path, tags, html_url, comments }: PostCardProps) => {
    return (
      <div className="Box p-3 mb-3">
        <h3 className="f4 mb-1">
          <Link href={"/" + path} className="Link--primary">
            {title}
          </Link>
        </h3>
        <p className="color-fg-muted mb-2">{summary}</p>
        <div className="d-flex flex-items-center flex-wrap">
          <span className="color-fg-muted text-small mr-3">{formatDate(created_at)}</span>
          {tags?.length > 0 && tags.map(tag => (
            <Link
              key={tag}
              href={"/tags/" + slug(tag)}
              className="Label Label--secondary mr-1 mb-1"
            >
              {tag}
            </Link>
          ))}
          {comments > 0 && (
            <Link href={html_url} target="_blank" className="color-fg-muted text-small ml-auto d-flex flex-items-center">
              <CommentIcon size={16} className="mr-1" />
              {comments}
            </Link>
          )}
        </div>
      </div>
    );
  },
);

interface PageNavProps {
  current: number;
  prev: number;
  prev_link: string;
  next: number;
  next_link: string;
  total: number;
}

export const PageNav = memo(async ({ current, prev, prev_link, next, next_link, total }: PageNavProps) => {
  const showPrev = prev && prev != 0;
  const showNext = next && next != 0 && next <= total;

  return (
    <nav className="paginate-container" aria-label="Pagination">
      <div className="pagination">
        {showPrev
          ? (
              <Link href={prev_link} className="previous_page">
                <ChevronLeftIcon size={16} />
                {" "}
                Previous
              </Link>
            )
          : (
              <span className="previous_page disabled">
                <ChevronLeftIcon size={16} />
                {" "}
                Previous
              </span>
            )}
        <span className="color-fg-muted">
          {current}
          {" "}
          /
          {total}
        </span>
        {showNext
          ? (
              <Link href={next_link} className="next_page">
                Next
                {" "}
                <ChevronRightIcon size={16} />
              </Link>
            )
          : (
              <span className="next_page disabled">
                Next
                {" "}
                <ChevronRightIcon size={16} />
              </span>
            )}
      </div>
    </nav>
  );
});

interface PostListProps {
  base: string;
  current?: number;
  posts: Post[];
}

const PostList = async ({ base, current = 1, posts }: PostListProps) => {
  const pageNumber = current;
  const postsPerPage = pagination.postsPerPage;
  const currentPosts = posts.slice(postsPerPage * (pageNumber - 1), postsPerPage * pageNumber);
  const paginationState = {
    currentPage: pageNumber,
    totalPages: Math.max(Math.ceil(posts.length / postsPerPage), 1),
  };
  if (currentPosts.length === 0) {
    return notFound();
  }
  return (
    <>
      {currentPosts.map(post => (
        <PostCard
          key={post.slug}
          title={post.title}
          created_at={post.created_at}
          summary={post.summary}
          path={post.path}
          html_url={post.html_url}
          tags={post.tags}
          comments={post.comments}
        />
      ))}
      <PageNav
        current={paginationState.currentPage}
        prev={paginationState.currentPage - 1}
        prev_link={
          paginationState.currentPage - 1 > 1 ? `${base}page/${paginationState.currentPage - 1}` : base
        }
        next={paginationState.currentPage + 1}
        next_link={`${base}page/${paginationState.currentPage + 1}`}
        total={paginationState.totalPages}
      />
    </>
  );
};

export default memo(PostList);
