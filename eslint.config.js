import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  stylistic.configs.customize({
    indent: 2,
    quotes: 'double',
    semi: true,
  }),
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/display-name": "off",
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
])

export default eslintConfig