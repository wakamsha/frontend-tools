import { defineConfig } from 'oxlint';
// import jestRuleSet from '../../rules/jest.ts';
import vitestRuleSet from '../../rules/vitest.ts';

export default defineConfig({
  extends: [
    // jestRuleSet,
    vitestRuleSet,
  ],
});
