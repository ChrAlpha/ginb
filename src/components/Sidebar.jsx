"use client";

import { useEffect, useState, memo } from "react";
import { NavBar } from "./layout/Header";
import { sitename } from "/_config";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <details className="z-40 flex flex-col gap-4 bg-white py-2.5 dark:bg-black md:hidden">
        <summary className="flex list-none flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="my-auto mr-1 size-6 fill-current"
          >
            <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"></path>
          </svg>
          <h2 className="inline text-xl">{sitename}</h2>
        </summary>
        <NavBar responsive="flex md:hidden" />
      </details>
    );
  }

  return (
    <>
      <button
        className="flex flex-row py-2.5 md:hidden"
        id="toggleSidebarButton"
        aria-label={sitename}
        onClick={toggleSidebar}
      >
        {isSidebarOpen
          ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="my-auto mr-1 size-6 fill-current"
              >
                <path d="M13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 1 0 1.414-1.414L13.414 12z"></path>
              </svg>
            )
          : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="my-auto mr-1 size-6 fill-current"
              >
                <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"></path>
              </svg>
            )}
        <h2 className="inline text-xl">{sitename}</h2>
      </button>
      {isSidebarOpen && (
        <div className="fixed right-0 top-12 z-40 flex size-full flex-col gap-4 bg-white p-4 dark:bg-black md:hidden">
          <NavBar responsive="flex md:hidden" click={toggleSidebar} />
        </div>
      )}
    </>
  );
};

export default memo(Sidebar);
