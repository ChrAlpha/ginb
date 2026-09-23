import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import Link from "next/link";
import { slug as slugger } from "github-slugger";
import { memo } from "react";
import "@/app/github.css";
import "@primer/css/dist/markdown.css";
import "katex/dist/katex.min.css";
import Image from "next/image";
import { CommentIcon } from "@primer/octicons-react";

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatter.format(new Date(date));
};

interface PostContentProps {
  title: string;
  created_at: string;
  contentRaw: string;
  tags: string[];
  comments: number;
  html_url: string;
}

const PostContent = async ({ title, created_at, contentRaw, tags, comments, html_url }: PostContentProps) => {
  return (
    <article className="Box">
      <div className="Box-header">
        <h1 className="Box-title f3">{title}</h1>
        <span className="color-fg-muted text-small d-block mt-1">{formatDate(created_at)}</span>
      </div>
      <div className="Box-body">
        <div className="markdown-body">
          <style>
            {`
            .katex-display {
              overflow-x: auto;
            }
            .markdown-body {
              background: transparent;
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
                const { src, width, height, alt, ...rest } = props;
                const restWithoutNode = { ...rest } as Record<string, unknown>;
                delete restWithoutNode.node;
                const imgSrc = typeof src === "string" ? src : undefined;
                if (!imgSrc) {
                  return <img alt={alt} {...restWithoutNode} />;
                }
                if (width && height) {
                  return (
                    <a href={imgSrc} target="_blank" rel="noopener noreferrer">
                      <Image src={imgSrc} width={Number(width)} height={Number(height)} alt={alt || ""} {...restWithoutNode} />
                    </a>
                  );
                }
                return (
                  <a href={imgSrc} target="_blank" rel="noopener noreferrer">
                    <img src={imgSrc} width={width} height={height} alt={alt} {...restWithoutNode} />
                  </a>
                );
              },
            }}
          >
            {contentRaw}
          </Markdown>
        </div>
      </div>
      <div className="Box-footer d-flex flex-items-center flex-justify-between">
        <div>
          {tags.map(tag => (
            <Link
              key={slugger(tag)}
              href={"/tags/" + slugger(tag)}
              className="Label Label--secondary mr-1"
            >
              #
              {tag}
            </Link>
          ))}
        </div>
        <Link href={html_url} target="_blank" className="color-fg-muted text-small d-flex flex-items-center Link--secondary">
          <CommentIcon size={16} className="mr-1" />
          {comments > 0 ? `${comments} Comments` : "Comment on GitHub"}
        </Link>
      </div>
    </article>
  );
};

export default memo(PostContent);
