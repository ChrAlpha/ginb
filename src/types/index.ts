export interface Post {
  title: string;
  slug: string;
  path: string;
  api: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  summary: string;
  contentRaw: string;
  comments: number;
  id?: string;
  content?: string;
}

/**
 * Site metadata configuration
 */
export interface SiteMetadata {
  /** Site title displayed in header and browser tab */
  title: string;
  /** Site description for SEO */
  description: string;
  /** Keywords for SEO */
  keywords: string[];
  /** Site favicon path */
  favicon: string;
}

/**
 * GitHub repository configuration
 */
export interface GitHubConfig {
  /** GitHub username or organization */
  owner: string;
  /** Repository name */
  repo: string;
}

/**
 * Social media links
 */
export interface SocialLink {
  /** Display name of the social platform */
  name: string;
  /** URL to the social profile */
  url: string;
  /** Optional icon name (for future icon support) */
  icon?: string;
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  /** Number of posts per page */
  postsPerPage: number;
}

/**
 * Footer configuration
 */
export interface FooterConfig {
  /** Footer content (supports Markdown) */
  content: string;
}

/**
 * Complete site configuration
 */
export interface SiteConfig {
  /** Site metadata */
  site: SiteMetadata;
  /** GitHub repository settings */
  github: GitHubConfig;
  /** Site URL (without trailing slash) */
  url: string;
  /** Social media links */
  social: SocialLink[];
  /** Pagination settings */
  pagination: PaginationConfig;
  /** Footer settings */
  footer: FooterConfig;
}

/**
 * @deprecated Use SiteConfig instead. This interface is kept for backward compatibility.
 */
export interface LegacySiteConfig {
  sitename: string;
  description: string;
  keywords: string[];
  username: string;
  repository: string;
  url: string;
  favicon: string;
  social: Record<string, string>;
  footer: string;
  post_per_page: number;
}

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}
