const siteConfig = {
  sitename: "GitHub Issues Next.js Blog",
  description: "A blog using GitHub Issues as CMS and Next.js as frontend",
  keywords: ["next.js", "blog", "github issues"],
  username: process.env.owner || process.env.VERCEL_GIT_REPO_OWNER || "USERNAME",
  repository: process.env.repo || process.env.VERCEL_GIT_REPO_SLUG || "REPOSITORY",
  url: "https://example.com", // If your site is put in a subdirectory, set url as 'http://example.com/child' and set basePath as '/child' in next.config.js
  favicon: "/favicon.ico",
  social: {
    // "Social name": "Social link"
    // eg. "GitHub@USERNAME": "https://github.com/USERNAME"
  },
  footer: `Proudly powred by Next.js@${require("next/package.json").version} and Vercel`,
  post_per_page: 20,
};

module.exports = siteConfig;
