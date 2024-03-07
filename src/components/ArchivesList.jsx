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
    <li className="relative flex flex-row border-l w-full p-4">
      <span className="absolute top-5 -left-[5.5px] my-auto w-2.5 h-2.5 bg-[#eaeaea] dark:bg-[#333] rounded-full"></span>
      <span className="shrink-0 mr-2 text-sm tabular-nums text-black/60 dark:text-white/60">
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
        } else {
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
