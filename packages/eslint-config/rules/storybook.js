// @ts-check
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';

const stories = {
  plugins: {
    storybook,
    import: importPlugin,
  },

  rules: {
    ...storybook.configs['flat/recommended'].reduce(
      (acc, { rules }) => ({
        ...acc,
        ...rules,
      }),
      {},
    ),
    ...storybook.configs['flat/csf-strict'].reduce(
      (acc, { rules }) => ({
        ...acc,
        ...rules,
      }),
      {},
    ),
    // Turn off this rule because type definitions such as `Meta` and `StoryObj` need to be imported from `@storybook/react`.
    // https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-renderer-packages.md
    'storybook/no-renderer-packages': ['off'],

    'import/no-default-export': ['off'],
  },
};

const config = {
  plugins: {
    storybook,
    import: importPlugin,
  },

  rules: {
    'storybook/no-uninstalled-addons': ['error'],
    'import/no-default-export': ['off'],
  },
};

export default {
  stories,
  config,
};
