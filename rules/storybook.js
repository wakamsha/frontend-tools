// @ts-check
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import * as storybook from 'eslint-plugin-storybook';

const base = {
  plugins: {
    storybook,
  },

  rules: {
    ...storybook.configs.recommended.rules,
    ...storybook.configs['csf-strict'].rules,
  },
};

const overrides = {
  plugins: {
    import: importPlugin,
  },

  rules: {
    'import/no-default-export': ['off'],
  },
};

export default {
  base,
  overrides,
};
