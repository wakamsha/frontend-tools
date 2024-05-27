// @ts-check
import react from 'eslint-plugin-react';
import jsxA11yConfig from '../rules/jsx-a11y.js';
import reactHooksConfig from '../rules/react-hooks.js';
import reactConfig from '../rules/react.js';

export default [
  {
    languageOptions: {
      ...react.configs.recommended.languageOptions,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  reactConfig,
  reactHooksConfig,
  jsxA11yConfig,
];
