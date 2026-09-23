import Link from "next/link";
import { Fragment, memo } from "react";
import type { Post } from "@/types";

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });
  return formatter.format(new Date(date));
};

interface ArchivesEntryProps {
  title: string;
  date: string;
  path: string;
}

const ArchivesEntry = memo(({ title, date, path }: ArchivesEntryProps) => {
  return (
    <div className="TimelineItem">
      <div className="TimelineItem-badge">
        <span className="color-bg-accent-emphasis d-block circle" style={{ width: 8, height: 8 }}></span>
      </div>
      <div className="TimelineItem-body d-flex flex-items-baseline">
        <span className="color-fg-muted text-small mr-2" style={{ minWidth: 50 }}>
          {formatDate(date)}
        </span>
        <Link href={path} className="Link--primary">
          {title}
        </Link>
      </div>
    </div>
  );
});

interface ArchivesListProps {
  posts: Post[];
}

export const ArchivesList = memo(({ posts }: ArchivesListProps) => {
  return (
    <div>
      {posts.map((post, index) => {
        const postYear = new Date(post.created_at).getFullYear();
        const prevYear = index > 0
          ? new Date(posts[index - 1].created_at).getFullYear()
          : null;
        const showYearHeader = postYear !== prevYear;

        if (showYearHeader) {
          return (
            <Fragment key={post.slug}>
              <h2 className="f3 mb-2 mt-4" id={"archives-" + postYear}>
                {postYear}
              </h2>
              <div className="TimelineItem-break"></div>
              <ArchivesEntry
                title={post.title}
                date={post.created_at}
                path={"/" + post.path}
              />
            </Fragment>
          );
        }
        else {
          return (
            <ArchivesEntry
              key={post.slug}
              title={post.title}
              date={post.created_at}
              path={"/" + post.path}
            />
          );
        }
      })}
    </div>
  );
});
