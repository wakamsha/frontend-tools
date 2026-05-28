import { defineConfig } from 'oxlint';
import jsxA11yRuleSet from '../rules/jsx-a11y.ts';
import reactRuleSet from '../rules/react.ts';

export default defineConfig({
  extends: [reactRuleSet, jsxA11yRuleSet],
});
