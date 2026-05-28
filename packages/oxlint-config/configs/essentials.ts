import { defineConfig } from 'oxlint';
import eslintRuleSet from '../rules/eslint.ts';
import importRuleSet from '../rules/import.ts';
import oxcRuleSet from '../rules/oxc.ts';
import promiseRuleSet from '../rules/promise.ts';
import unicornRuleSet from '../rules/unicorn.ts';

export default defineConfig({
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'error',
    perf: 'error',
    style: 'error',
    restriction: 'error',
  },
  extends: [
    eslintRuleSet,
    oxcRuleSet,
    importRuleSet,
    promiseRuleSet,
    unicornRuleSet,
  ],
  env: {
    builtin: true,
  },
  ignorePatterns: ['**/bin/*', '**/build/*', '**/dist/*', '**/node_modules/*'],
});
