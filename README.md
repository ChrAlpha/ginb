# ginb

GitHub Issues Next.js Blog

## 介绍 Introduction

ginb (GitHub Issues Next.js Blog) 是一个基于 GitHub Issues 作为 CMS、Next.js 作为前端框架的博客模板。

ginb (GitHub Issues Next.js Blog) is a blog template that uses GitHub Issues as a CMS and Next.js as the frontend framework.

## 使用 Usage

1. Fork 本仓库
2. 修改 `_config.js` 文件中的 `sitename` 和 `description` 字段，有意绑定域名的亦需修改 `url`
3. 在 Vercel 关联你的仓库，将环境变量 `GITHUB_TOKEN` 设置为你的 [GitHub Personal Access Token](https://github.com/settings/tokens)
4. 部署 🚀

---

1. Fork this repository.
2. Modify the `sitename` and `description` fields in the `_config.js` file. If you plan to bind a domain name, also modify the `url`.
3. Link your repository to Vercel and set the `GITHUB_TOKEN` environment variable to your [GitHub Personal Access Token](https://github.com/settings/tokens).
4. Deploy 🚀

更多配置请参考 Wiki。

For more configuration, please refer to the Wiki.

## 贡献 Contribution

欢迎各种形式的贡献，包括但不限于：主题优化，功能添加，代码改进，bug 反馈。期待你的参与！

All kinds of contributions are welcomed, including but not limited to theme optimization, feature addition, code improvement, and bug feedback. Looking forward to your participation!

## TODO

- [ ] TypeScript
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
