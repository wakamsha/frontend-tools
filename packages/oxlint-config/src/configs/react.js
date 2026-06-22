import { defineConfig } from 'oxlint';
import jsxA11yRuleSet from '../rules/jsx-a11y.js';
import reactRuleSet from '../rules/react.js';

export default defineConfig({
  extends: [reactRuleSet, jsxA11yRuleSet],
});
