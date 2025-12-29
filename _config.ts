import type { SiteConfig, LegacySiteConfig, SocialLink } from "@/types";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Parse a comma-separated string into an array
 * Example: "next.js, blog, github" -> ["next.js", "blog", "github"]
 */
function parseArrayEnv(value: string | undefined, fallback: string[]): string[] {
  if (!value) return fallback;
  return value.split(",").map(item => item.trim()).filter(Boolean);
}

/**
 * Parse a JSON string of social links from environment variable
 * Example: '[{"name":"GitHub","url":"https://github.com/user"}]'
 */
function parseSocialEnv(value: string | undefined, fallback: SocialLink[]): SocialLink[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is SocialLink =>
          typeof item === "object"
          && item !== null
          && typeof item.name === "string"
          && typeof item.url === "string",
      );
    }
  }
  catch {
    console.warn("[config] Failed to parse SITE_SOCIAL environment variable");
  }
  return fallback;
}

/**
 * Parse a number from environment variable
 */
function parseNumberEnv(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

// =============================================================================
// DEFAULT VALUES
// =============================================================================

const defaults = {
  site: {
    title: "GitHub Issues Next.js Blog",
    description: "A blog using GitHub Issues as CMS and Next.js as frontend",
    keywords: ["next.js", "blog", "github issues"],
    favicon: "/favicon.ico",
  },
  pagination: {
    postsPerPage: 20,
  },
  footer: {
    content:
      "Proudly powered by [ginb](https://github.com/ChrAlpha/ginb) based on [Next.js](https://nextjs.org) and [Vercel](https://vercel.com)",
  },
  social: [] as SocialLink[],
};

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

const siteConfig: SiteConfig = {
  // ---------------------------------------------------------------------------
  // Site Metadata
  // ---------------------------------------------------------------------------
  site: {
    /**
     * Site title displayed in header and browser tab
     * Environment variable: SITE_TITLE
     */
    title: process.env.SITE_TITLE || defaults.site.title,

    /**
     * Site description for SEO and meta tags
     * Environment variable: SITE_DESCRIPTION
     */
    description: process.env.SITE_DESCRIPTION || defaults.site.description,

    /**
     * Keywords for SEO (used in meta tags)
     * Environment variable: SITE_KEYWORDS (comma-separated)
     * Example: "next.js, blog, github issues"
     */
    keywords: parseArrayEnv(process.env.SITE_KEYWORDS, defaults.site.keywords),

    /**
     * Favicon path (relative to public folder)
     * Environment variable: SITE_FAVICON
     */
    favicon: process.env.SITE_FAVICON || defaults.site.favicon,
  },

  // ---------------------------------------------------------------------------
  // GitHub Configuration
  // ---------------------------------------------------------------------------
  github: {
    /**
     * GitHub username or organization name
     * Environment variable: GITHUB_OWNER
     * Falls back to Vercel's VERCEL_GIT_REPO_OWNER
     */
    owner: process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER || "",

    /**
     * Repository name where issues are stored
     * Environment variable: GITHUB_REPO
     * Falls back to Vercel's VERCEL_GIT_REPO_SLUG
     */
    repo: process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG || "",
  },

  // ---------------------------------------------------------------------------
  // Site URL
  // ---------------------------------------------------------------------------
  /**
   * Full site URL without trailing slash
   * Environment variable: SITE_URL
   * Falls back to Vercel's branch URL
   *
   * If your site is in a subdirectory:
   * - Set url as 'https://example.com/blog'
   * - Set basePath as '/blog' in next.config.js
   */
  url: process.env.SITE_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`,

  // ---------------------------------------------------------------------------
  // Social Links
  // ---------------------------------------------------------------------------
  /**
   * Social media links displayed in the sidebar
   * Environment variable: SITE_SOCIAL (JSON array)
   * Example: '[{"name":"GitHub","url":"https://github.com/user"},{"name":"Twitter","url":"https://twitter.com/user"}]'
   */
  social: parseSocialEnv(process.env.SITE_SOCIAL, defaults.social),

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------
  pagination: {
    /**
     * Number of posts to display per page
     * Environment variable: SITE_POSTS_PER_PAGE
     */
    postsPerPage: parseNumberEnv(process.env.SITE_POSTS_PER_PAGE, defaults.pagination.postsPerPage),
  },

  // ---------------------------------------------------------------------------
  // Footer
  // ---------------------------------------------------------------------------
  footer: {
    /**
     * Footer content (supports Markdown link syntax)
     * Environment variable: SITE_FOOTER
     * Example: "© 2024 [My Blog](https://example.com)"
     */
    content: process.env.SITE_FOOTER || defaults.footer.content,
  },
};

// =============================================================================
// EXPORTS
// =============================================================================

export default siteConfig;

// Named exports for convenient access
export const { site, github, url, social, pagination, footer } = siteConfig;

// =============================================================================
// LEGACY COMPATIBILITY LAYER
// =============================================================================

/**
 * Convert new config format to legacy format for backward compatibility
 * @deprecated Will be removed in future versions
 */
function toLegacyConfig(config: SiteConfig): LegacySiteConfig {
  const socialRecord: Record<string, string> = {};
  config.social.forEach((link: SocialLink) => {
    socialRecord[link.name] = link.url;
  });

  return {
    sitename: config.site.title,
    description: config.site.description,
    keywords: config.site.keywords,
    username: config.github.owner,
    repository: config.github.repo,
    url: config.url,
    favicon: config.site.favicon,
    social: socialRecord,
    footer: config.footer.content,
    post_per_page: config.pagination.postsPerPage,
  };
}

/**
 * @deprecated Use new named exports instead
 * Legacy exports for backward compatibility with existing code
 */
const legacy = toLegacyConfig(siteConfig);
export const sitename = legacy.sitename;
export const description = legacy.description;
export const keywords = legacy.keywords;
export const username = legacy.username;
export const repository = legacy.repository;
export const favicon = legacy.favicon;
export const post_per_page = legacy.post_per_page;
