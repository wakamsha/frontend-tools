import { defineConfig } from 'oxlint';
import eslintRuleSet from '../rules/eslint.js';
import importRuleSet from '../rules/import.js';
import oxcRuleSet from '../rules/oxc.js';
import promiseRuleSet from '../rules/promise.js';
import unicornRuleSet from '../rules/unicorn.js';

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
