import { memo } from "react";
import { footer } from "/_config";

const parseMarkdownLinks = (text) => {
  const parts = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)]\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      parts.push(text.substring(lastIndex, startIndex));
    }

    parts.push(
      <a href={linkUrl} key={startIndex} className="text-blue-600 hover:underline">
        {linkText}
      </a>,
    );

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

const Footer = async () => {
  const rawFooter = `Copyright © ${new Date().getFullYear()}` + (footer ? ` | ${footer}` : "");
  const parsedFooter = parseMarkdownLinks(rawFooter);

  return (
    <>
      <footer className="mt-auto h-12 border-t p-4 text-xs text-black/60 dark:text-white/60">
        <p className="container mx-auto w-full max-w-screen-xl">
          {parsedFooter.map((part) => part)}
        </p>
      </footer>
    </>
  );
};

export default memo(Footer);
