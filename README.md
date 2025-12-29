# ginb

GitHub Issues Next.js Blog

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FChrAlpha%2Fginb&env=GITHUB_TOKEN&envDescription=GitHub%20Personal%20Access%20Token%20for%20API%20authentication&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens&project-name=my-ginb-blog&repository-name=my-ginb-blog)

## 介绍 Introduction

ginb (GitHub Issues Next.js Blog) 是一个基于 GitHub Issues 作为 CMS、Next.js 作为前端框架的博客模板。

ginb (GitHub Issues Next.js Blog) is a blog template that uses GitHub Issues as a CMS and Next.js as the frontend framework.

## 特性 Features

- [x] Dark mode
- [x] GitHub flavored markdown
- [x] Syntax highlight
- [x] KaTeX support
- [x] Labels used as tags
- [x] Metadata for SEO optimization
- [x] RSS feed
- [x] TypeScript

## 使用 Usage

### 方式一：一键部署（推荐）

点击上方的 "Deploy with Vercel" 按钮，按照提示完成部署。你只需要设置 `GITHUB_TOKEN` 环境变量即可。

### 方式二：手动部署

1. Fork 本仓库
2. 在 Vercel 关联你的仓库
3. 设置环境变量 `GITHUB_TOKEN` 为你的 [GitHub Personal Access Token](https://github.com/settings/tokens)
4. 部署 🚀

---

### Option 1: One-Click Deploy (Recommended)

Click the "Deploy with Vercel" button above and follow the prompts. You only need to set the `GITHUB_TOKEN` environment variable.

### Option 2: Manual Deploy

1. Fork this repository
2. Link your repository to Vercel
3. Set the `GITHUB_TOKEN` environment variable to your [GitHub Personal Access Token](https://github.com/settings/tokens)
4. Deploy 🚀

## 配置 Configuration

所有配置项均可通过环境变量设置，无需修改代码。

All configuration options can be set via environment variables, no code changes needed.

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `GITHUB_TOKEN` | GitHub API Token（必填） | - |
| `GITHUB_OWNER` | GitHub 用户名/组织 | Vercel 自动检测 |
| `GITHUB_REPO` | 仓库名 | Vercel 自动检测 |
| `SITE_TITLE` | 站点标题 | "GitHub Issues Next.js Blog" |
| `SITE_DESCRIPTION` | 站点描述 | "A blog using GitHub Issues as CMS..." |
| `SITE_KEYWORDS` | SEO 关键词（逗号分隔） | "next.js, blog, github issues" |
| `SITE_URL` | 站点 URL | Vercel 自动检测 |
| `SITE_FAVICON` | Favicon 路径 | "/favicon.ico" |
| `SITE_SOCIAL` | 社交链接（JSON 数组） | `[]` |
| `SITE_POSTS_PER_PAGE` | 每页文章数 | 20 |
| `SITE_FOOTER` | 页脚内容（支持 Markdown 链接） | "Proudly powered by ginb..." |

### 社交链接配置示例

```
SITE_SOCIAL='[{"name":"GitHub","url":"https://github.com/username"},{"name":"Twitter","url":"https://twitter.com/username"}]'
```

更多配置请参考 [.env.example](.env.example)。

For more configuration details, please refer to [.env.example](.env.example).

## 贡献 Contribution

欢迎各种形式的贡献，包括但不限于：主题优化，功能添加，代码改进，bug 反馈。期待你的参与！

All kinds of contributions are welcomed, including but not limited to theme optimization, feature addition, code improvement, and bug feedback. Looking forward to your participation!

## TODO

- [ ] Internationalization
- [ ] Search Component
- [ ] Comments in post
- [ ] Your idea...

## 相关项目 Related Projects

- Front-end framework: [Next.js](https://nextjs.org/)
- Front-end style: [Tailwind CSS](https://tailwindcss.com/)
- CMS: [GitHub Issues](https://docs.github.com/en/rest/reference/issues)
- Markdown content parser: [react-markdown](https://github.com/remarkjs/react-markdown)
- Syntax highlighter: [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
- GitHub flavored markdown support: [remark-gfm](https://github.com/remarkjs/remark-gfm)
- LaTeX support: [remark-math](https://github.com/remarkjs/remark-math) and [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)
- Code linter: [ESLint](https://eslint.org/)
- Code formatter: [Prettier](https://prettier.io/)
- Commit hook: [Husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/lint-staged/lint-staged)

## License

[MIT](/LICENSE)
