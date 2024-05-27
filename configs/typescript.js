// @ts-check
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptConfig from '../rules/typescript.js';

export default [
  {
    files: ['**/*.@(ts|tsx|cts|mts)'],

    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: true,
      },
    },

    ...typescriptConfig,
  },
];
