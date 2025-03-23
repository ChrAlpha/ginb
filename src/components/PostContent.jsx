import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import Link from "next/link";
import { slug as slugger } from "github-slugger";
import { memo } from "react";
import "/public/github.css";
import "katex/dist/katex.min.css";
import Image from "next/image";

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date(date));
};

const PostContent = async ({ title, created_at, contentRaw, tags, comments, html_url }) => {
  return (
    <article className="mt-8 rounded-lg border md:mt-0">
      <div className="p-4">
        <h1 className="text-2xl">{title}</h1>
        <div className="mt-4 text-sm text-black/60 dark:text-white/60">
          <span>{formatDate(created_at)}</span>
        </div>
        <div className="prose mt-4 max-w-none dark:prose-invert prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-black/60 prose-code:rounded-md prose-code:bg-gray-300/30 prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:-mx-4 prose-pre:overflow-x-auto prose-pre:rounded-none prose-pre:bg-transparent prose-pre:p-0 prose-table:overflow-x-auto dark:prose-blockquote:text-white/60">
          <style>
            {`
            .katex-display {
              overflow-x: auto;
            }
          `}
          </style>
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]}
            components={{
              table: (props) => {
                const { children, className, ...rest } = props;
                return (
                  <div className="overflow-x-auto">
                    <table className={className} {...rest}>
                      {children}
                    </table>
                  </div>
                );
              },
              img: (props) => {
                const { src, width, height, ...rest } = props;
                delete rest.node;
                if (!src) {
                  return <img {...rest} />;
                }
                if (width && height) {
                  return (
                    <a href={src} target="_blank" rel="noopener noreferrer">
                      <Image src={src} width={width} height={height} {...rest} />
                    </a>
                  );
                }
                return (
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    <img src={src} width={width} height={height} {...rest} />
                  </a>
                );
              },
            }}
          >
            {contentRaw}
          </Markdown>
        </div>
      </div>
      <div className="flex justify-between border-t p-4">
        <div className="flex flex-row flex-wrap gap-4">
          {tags.map(tag => (
            <Link
              key={slugger(tag)}
              className="text-black/60 before:content-['#'] hover:underline dark:text-white/60"
              href={"/tags/" + slugger(tag)}
            >
              {tag}
            </Link>
          ))}
        </div>
        {comments > 0
          ? (
            <div className="text-black/60 hover:underline dark:text-white/60">
              <Link className="flex flex-row" href={html_url} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="my-auto h-4 w-4"
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
          )
          : (
            <div className="text-black/60 hover:underline dark:text-white/60">
              <Link className="flex flex-row" href={html_url} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="my-auto h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Comment on GitHub</span>
              </Link>
            </div>
          )}
      </div>
    </article>
  );
};

export default memo(PostContent);
