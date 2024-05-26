import typescriptEslintParser from '@typescript-eslint/parser';
import { defineFlatConfig } from 'eslint-define-config';
import typescriptConfig from '../rules/typescript.js';

export default defineFlatConfig([
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
]);
