"use client";

import { useEffect, useState, memo } from "react";
import { NavBar } from "../app/header";
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
      <details className="flex md:hidden flex-col gap-4 py-2.5 bg-white dark:bg-black z-40">
        <summary className="list-none flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="my-auto mr-1 w-6 h-6 fill-current"
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
        className="flex flex-row md:hidden py-2.5"
        id="toggleSidebarButton"
        aria-label={sitename}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="my-auto mr-1 w-6 h-6 fill-current"
          >
            <path d="M13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 1 0 1.414-1.414L13.414 12z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="my-auto mr-1 w-6 h-6 fill-current"
          >
            <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"></path>
          </svg>
        )}
        <h2 className="inline text-xl">{sitename}</h2>
      </button>
      {isSidebarOpen && (
        <div className="md:hidden fixed top-12 right-0 flex flex-col gap-4 w-full h-full p-4 bg-white dark:bg-black z-40">
          <NavBar responsive="flex md:hidden" click={toggleSidebar} />
        </div>
      )}
    </>
  );
};

export default memo(Sidebar);
