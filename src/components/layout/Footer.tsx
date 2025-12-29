import { memo } from "react";
import { footer } from "/_config";
import { parseMarkdownLinks } from "@/lib/utils/markdown";

const Footer = async () => {
  const rawFooter = `Copyright © ${new Date().getFullYear()}` + (footer.content ? ` | ${footer.content}` : "");
  const parsedFooter = parseMarkdownLinks(rawFooter);

  return (
    <>
      <footer className={`
        mt-auto h-12 border-t p-4 text-xs text-black/60
        dark:text-white/60
      `}
      >
        <p className="container mx-auto w-full max-w-screen-xl">
          {parsedFooter.map(part => part)}
        </p>
      </footer>
    </>
  );
};

export default memo(Footer);
