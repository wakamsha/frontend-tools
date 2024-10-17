import tseslint from 'typescript-eslint';
import typescriptRuleSet from '../rules/typescript.js';

export default tseslint.config({
  files: ['**/*.@(ts|tsx|cts|mts)'],

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
    },
  },

  ...typescriptRuleSet,
});
