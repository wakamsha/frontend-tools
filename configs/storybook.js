// @ts-check
import storybookRuleSet from '../rules/storybook.js';

export default [
  {
    files: ['**/*.@(stories|story).@(ts|tsx|js|jsx)'],
    ...storybookRuleSet.stories,
  },

  {
    files: ['**/.storybook/**/*.@(js|cjs|mjs|ts)'],
    ...storybookRuleSet.config,
  },
];
