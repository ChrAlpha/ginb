import { ToggleTheme } from "../ToggleTheme";
import Sidebar from "../Sidebar";
import Link from "next/link";
import { memo } from "react";
import { site } from "/_config";

interface NavBarProps {
  responsive: string;
  click?: (() => void) | false;
}

export const NavBar = memo(({ responsive, click = false }: NavBarProps) => {
  return (
    <>
      <nav className={responsive + " flex-col gap-6 md:flex-row"}>
        <Link className="my-auto hidden md:block" href="/">
          <h2 className="inline text-xl">{site.title}</h2>
        </Link>
        <Link
          className="my-auto p-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          href="/"
          onClick={click || undefined}
        >
          Home
        </Link>
        <Link
          className="my-auto p-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          href="/archives/"
          onClick={click || undefined}
        >
          Archives
        </Link>
        <Link
          className="my-auto p-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          href="/tags/"
          onClick={click || undefined}
        >
          Tags
        </Link>
      </nav>
    </>
  );
});

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 order-first flex min-h-12 w-full items-stretch border-b bg-white dark:bg-black md:bg-white/90 md:backdrop-blur-sm md:dark:bg-black/80">
        <div className="container mx-auto flex w-full max-w-screen-xl items-stretch justify-between px-4">
          <Sidebar />
          <NavBar responsive="hidden md:flex" />
          <div className="relative flex flex-row items-center gap-4">
            <ToggleTheme />
            <a
              className="text-[#666] hover:text-black focus:outline-none dark:text-[#888] dark:hover:text-white"
              target="_blank"
              href="/rss"
              aria-label="RSS feed of this site"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
