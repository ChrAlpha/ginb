import type { ReactNode } from "react";

/**
 * Parse markdown-style links in text and convert to React elements
 */
export const parseMarkdownLinks = (text: string): (string | ReactNode)[] => {
  const parts: (string | ReactNode)[] = [];
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
      <a
        href={linkUrl}
        key={startIndex}
        className={`
          text-blue-600
          hover:underline
        `}
      >
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
