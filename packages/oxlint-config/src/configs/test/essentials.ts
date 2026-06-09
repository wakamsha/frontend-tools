import { defineConfig } from 'oxlint';
import vitestRuleSet from '../../rules/vitest.ts';

export default defineConfig({
  extends: [vitestRuleSet],
});
