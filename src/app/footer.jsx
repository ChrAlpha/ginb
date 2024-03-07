import { memo } from "react";
import { footer } from "/_config";

const Footer = async () => {
  return (
    <>
      <footer className="h-12 border-t mt-auto p-4 text-xs text-black/60 dark:text-white/60">
        <p className="container max-w-screen-xl w-full mx-auto">
          Copyright © {new Date().getFullYear()}
          {footer && (
            <>
              <span className="px-1">|</span>
              {footer}
            </>
          )}
        </p>
      </footer>
    </>
  );
};

export default memo(Footer);
