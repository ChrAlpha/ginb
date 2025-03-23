import Link from "next/link";
import { memo } from "react";

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date(date));
};

const ArchivesEntry = memo(({ title, date, path }) => {
  return (
    <li className="relative flex w-full flex-row border-l p-4">
      <span className="absolute -left-[5.5px] top-5 my-auto h-2.5 w-2.5 rounded-full bg-[#eaeaea] dark:bg-[#333]"></span>
      <span className="mr-2 shrink-0 text-sm tabular-nums text-black/60 dark:text-white/60">
        {formatDate(date)}
      </span>
      <Link className="hover:underline" href={path}>
        <h3>{title}</h3>
      </Link>
    </li>
  );
});

export const ArchivesList = memo(({ posts }) => {
  let yr = "";
  return (
    <ul className="p-4">
      {posts.map((post) => {
        if (new Date(post.created_at).getFullYear() != yr) {
          yr = new Date(post.created_at).getFullYear();
          return (
            <>
              <h2 className="-ml-4 text-2xl" id={"archives-" + yr}>
                {yr}
              </h2>
              <ArchivesEntry
                key={post.slug}
                title={post.title}
                date={post.created_at}
                path={"/" + post.path}
              />
            </>
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
