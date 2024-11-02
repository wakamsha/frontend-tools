import { essentials, node, test, typescript } from '@wakamsha/eslint-config';

export default [
  {
    files: ['**/*.js'],
  },

  ...essentials,
  {
    rules: {
      'import/no-default-export': ['off'],
      'unicorn/filename-case': ['off'],
    },
  },
  {
    files: ['**/*.config.@(js|ts)'],
    rules: {
      'no-restricted-exports': ['off'],
      'import/no-extraneous-dependencies': ['off'],
    },
  },

  ...node,

  ...typescript,

  ...test.essentials,
];
