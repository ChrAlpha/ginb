"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useState, useEffect } from "react";
import { useTheme } from "../ToggleTheme";
import {
  HomeIcon,
  ArchiveIcon,
  TagIcon,
  RssIcon,
  SunIcon,
  MoonIcon,
  DeviceDesktopIcon,
} from "@primer/octicons-react";
import { UnderlineNav, Avatar, IconButton, ActionMenu, ActionList } from "@primer/react";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: DeviceDesktopIcon },
] as const;

// /_config reads server-only env vars, so the server layout passes these in
interface HeaderProps {
  title: string;
  owner: string;
}

const Header = ({ title, owner }: HeaderProps) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showCompactHeader, setShowCompactHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show compact header once the sidebar avatar has scrolled out of view
      setShowCompactHeader(window.scrollY > 460);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/page/") || pathname.startsWith("/post/");
    }
    return pathname.startsWith(path);
  };

  const ThemeIcon = theme === "dark" ? MoonIcon : theme === "light" ? SunIcon : DeviceDesktopIcon;

  return (
    <div
      className="d-flex px-3 px-md-4 px-lg-5"
      style={{ height: "100%", maxWidth: 1280, margin: "0 auto", marginBottom: -1 }}
    >
      {/* Left section: Avatar + Site name (same width as sidebar) */}
      <div className="header-sidebar d-none d-md-flex flex-items-center flex-shrink-0">
        <div
          className="d-flex flex-items-center"
          style={{
            opacity: showCompactHeader ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
            pointerEvents: showCompactHeader ? "auto" : "none",
          }}
        >
          <Avatar
            src={`https://github.com/${owner}.png`}
            alt="Avatar"
            size={32}
          />
          <Link
            href="/"
            className="f5 text-bold color-fg-default no-underline ml-2"
          >
            {title}
          </Link>
        </div>
      </div>

      {/* Center section: UnderlineNav */}
      <UnderlineNav aria-label="Navigation" className="flex-auto min-width-0">
        <UnderlineNav.Item
          as={Link}
          href="/"
          aria-current={isActive("/") ? "page" : undefined}
          icon={HomeIcon}
        >
          Posts
        </UnderlineNav.Item>
        <UnderlineNav.Item
          as={Link}
          href="/archives/"
          aria-current={isActive("/archives") ? "page" : undefined}
          icon={ArchiveIcon}
        >
          Archives
        </UnderlineNav.Item>
        <UnderlineNav.Item
          as={Link}
          href="/tags/"
          aria-current={isActive("/tags") ? "page" : undefined}
          icon={TagIcon}
        >
          Tags
        </UnderlineNav.Item>
      </UnderlineNav>

      {/* Right section: Theme switcher + RSS */}
      <div className="d-flex flex-items-center flex-shrink-0 ml-2">
        <ActionMenu>
          <ActionMenu.Anchor>
            <IconButton icon={ThemeIcon} variant="invisible" aria-label="Change color theme" />
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="auto" align="end">
            <ActionList selectionVariant="single">
              {THEME_OPTIONS.map(option => (
                <ActionList.Item
                  key={option.value}
                  selected={theme === option.value}
                  onSelect={() => setTheme(option.value)}
                >
                  <ActionList.LeadingVisual>
                    <option.icon />
                  </ActionList.LeadingVisual>
                  {option.label}
                </ActionList.Item>
              ))}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
        <IconButton
          as="a"
          href="/rss"
          target="_blank"
          icon={RssIcon}
          variant="invisible"
          aria-label="RSS feed of this site"
        />
      </div>
    </div>
  );
};

export default memo(Header);
