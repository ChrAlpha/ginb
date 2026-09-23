import { memo } from "react";
import { footer } from "/_config";
import { parseMarkdownLinks } from "@/lib/utils/markdown";

const Footer = async () => {
  const rawFooter = `Copyright © ${new Date().getFullYear()}` + (footer.content ? ` | ${footer.content}` : "");
  const parsedFooter = parseMarkdownLinks(rawFooter);

  return (
    <div className="py-4 border-top color-border-muted">
      <p className="color-fg-muted text-small mb-0">
        {parsedFooter.map(part => part)}
      </p>
    </div>
  );
};

export default memo(Footer);
