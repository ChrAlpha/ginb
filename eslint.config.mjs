import stylistic from "@stylistic/eslint-plugin";
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = [
  {
    ...stylistic.configs.customize({
      indent: 2,
      quotes: "double",
      semi: true,
    }),
  },
  ...fixupConfigRules(compat.config({
    extends: ["next"],
    rules: {
      "react/display-name": "off",
    },
    overrides: [
      {
        files: ["./src/**/*.{js,jsx,ts,tsx}"],
      },
    ],
  })),
  ...tailwind.configs["flat/recommended"],
  { ignores: [".next/*", "out/*"] },
];

export default config;
