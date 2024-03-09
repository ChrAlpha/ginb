import { memo } from "react";
import { footer } from "/_config";

const Footer = async () => {
  return (
    <>
      <footer className="mt-auto h-12 border-t p-4 text-xs text-black/60 dark:text-white/60">
        <p className="container mx-auto w-full max-w-screen-xl">
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
