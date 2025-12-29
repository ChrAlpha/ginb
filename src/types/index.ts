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

export interface SiteConfig {
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
