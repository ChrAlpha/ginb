import Link from "next/link";
import { Fragment, memo } from "react";
import type { Post } from "@/types";

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
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
    <li className="relative flex w-full flex-row border-l p-4">
      <span className="absolute -left-[5.5px] top-5 my-auto size-2.5 rounded-full bg-[#eaeaea] dark:bg-[#333]"></span>
      <span className="mr-2 shrink-0 text-sm tabular-nums text-black/60 dark:text-white/60">
        {formatDate(date)}
      </span>
      <Link className="hover:underline" href={path}>
        <h3>{title}</h3>
      </Link>
    </li>
  );
});

interface ArchivesListProps {
  posts: Post[];
}

export const ArchivesList = memo(({ posts }: ArchivesListProps) => {
  return (
    <ul className="p-4">
      {posts.map((post, index) => {
        const postYear = new Date(post.created_at).getFullYear();
        const prevYear = index > 0
          ? new Date(posts[index - 1].created_at).getFullYear()
          : null;
        const showYearHeader = postYear !== prevYear;

        if (showYearHeader) {
          return (
            <Fragment key={post.slug}>
              <li className="-ml-4 list-none">
                <h2 className="text-2xl" id={"archives-" + postYear}>
                  {postYear}
                </h2>
              </li>
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
    </ul>
  );
});
