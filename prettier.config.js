/** @type {import('prettier').Config} */
const config = {
  semi: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
