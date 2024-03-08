import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { slug as slugger } from "github-slugger";
import { memo } from "react";
import "/public/github.css";

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date(date));
};

const PostContent = async ({
  title,
  created_at,
  updated_at,
  contentRaw,
  tags,
  slug,
  path,
  comments,
  html_url,
}) => {
  return (
    <article className="mt-8 md:mt-0 border rounded-lg">
      <div className="p-4">
        <h1 className="text-2xl">{title}</h1>
        <div className="mt-4 text-sm text-black/60 dark:text-white/60">
          <span>{formatDate(created_at)}</span>
        </div>
        <div className="max-w-none mt-4 prose dark:prose-invert prose-pre:bg-transparent prose-pre:rounded-none prose-pre:-mx-4 prose-pre:p-0 prose-pre:overflow-x-auto prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-black/60 dark:prose-blockquote:text-white/60 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:font-normal prose-code:bg-gray-300/30 prose-code:py-0.5 prose-code:px-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
          <Markdown
            children={contentRaw}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          />
        </div>
      </div>
      <div className="flex justify-between border-t p-4">
        <div className="flex flex-row flex-wrap gap-4">
          {tags.map((tag) => (
            <Link
              key={slugger(tag)}
              className="text-black/60 dark:text-white/60 hover:underline before:content-['#']"
              href={"/tags/" + slugger(tag)}
            >
              {tag}
            </Link>
          ))}
        </div>
        {comments > 0 && (
          <div className="text-black/60 dark:text-white/60 hover:underline">
            <Link className="flex flex-row" href={html_url} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 my-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{comments} Comments</span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default memo(PostContent);
