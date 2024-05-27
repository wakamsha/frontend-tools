// @ts-check
import storybookConfig from '../rules/storybook.js';

export default [
  storybookConfig.base,

  {
    files: [
      '*.stories.@(ts|tsx|js|jsx)',
      '**/.storybook/**/*.@(ts|tsx|js|jsx)',
    ],
    ...storybookConfig.overrides,
  },
];
