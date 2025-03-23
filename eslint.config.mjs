import stylistic from "@stylistic/eslint-plugin";
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const config = [
  {
    plugins: {
      stylistic
    },
    rules: {
      "stylistic/indent": ["warn", 2],
      "stylistic/linebreak-style": ["warn", "unix"],
      "stylistic/quotes": ["warn", "double"],
      "stylistic/semi": ["warn", "always"],
    }
  },
  ...fixupConfigRules(compat.config({
    extends: ["next"],
    rules: {
      "react/display-name": "off",
    },
    overrides: [
      {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
      }
    ]
  })),
  ...tailwind.configs["flat/recommended"],
  { ignores: [".next/*", "out/*"] }
];

export default config;