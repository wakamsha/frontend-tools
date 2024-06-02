// @ts-check
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import * as storybook from 'eslint-plugin-storybook';

const stories = {
  plugins: {
    storybook,
    import: importPlugin,
  },

  rules: {
    ...storybook.configs.recommended.overrides[0].rules,
    ...storybook.configs['csf-strict'].rules,
    'import/no-default-export': ['off'],
  },
};

const config = {
  plugins: {
    storybook,
    import: importPlugin,
  },

  rules: {
    ...storybook.configs.recommended.overrides[1].rules,
    'import/no-default-export': ['off'],
  },
};

export default {
  stories,
  config,
};
