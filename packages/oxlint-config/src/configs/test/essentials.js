import { defineConfig } from 'oxlint';
import vitestRuleSet from '../../rules/vitest.js';

export default defineConfig({
  extends: [vitestRuleSet],
});
