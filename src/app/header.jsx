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
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
