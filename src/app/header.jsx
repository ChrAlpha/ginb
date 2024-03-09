import { ToggleTheme } from "../components/ToggleTheme";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { memo } from "react";
import { sitename } from "/_config";

export const NavBar = memo(({ responsive, click = false }) => {
  return (
    <>
      <nav className={responsive + " flex-col md:flex-row gap-6"}>
        <Link className="hidden md:block my-auto" href="/">
          <h2 className="inline text-xl">{sitename}</h2>
        </Link>
        <Link
          className="my-auto p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          href="/"
          onClick={click}
        >
          首页
        </Link>
        <Link
          className="my-auto p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          href="/archives/"
          onClick={click}
        >
          归档
        </Link>
        <Link
          className="my-auto p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          href="/tags/"
          onClick={click}
        >
          标签
        </Link>
      </nav>
    </>
  );
});

const Header = () => {
  return (
    <>
      <header className="order-first flex items-stretch sticky top-0 z-50 w-full min-h-header border-b bg-white dark:bg-black md:bg-white/90 md:dark:bg-black/80 md:backdrop-blur-sm">
        <div className="flex justify-between items-stretch container max-w-screen-xl w-full mx-auto px-4">
          <Sidebar />
          <NavBar responsive="hidden md:flex" />
          <div className="relative flex flex-row gap-4 items-center">
            <ToggleTheme />
            <Link
              className="text-[#666] dark:text-[#888] hover:text-black dark:hover:text-white focus:outline-none"
              href="/rss"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
