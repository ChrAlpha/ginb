const siteConfig = {
  sitename: "GitHub Issues Next.js Blog",
  description: "A blog using GitHub Issues as CMS and Next.js as frontend",
  username:
    process.env.owner || process.env.VERCEL_GIT_REPO_OWNER || "USERNAME",
  repository:
    process.env.repo || process.env.VERCEL_GIT_REPO_SLUG || "REPOSITORY",
  social: {},
  footer: `Proudly powred by Next.js@${
    require("next/package.json").version
  } and Vercel`,
  post_per_page: 20,
};

module.exports = siteConfig;
