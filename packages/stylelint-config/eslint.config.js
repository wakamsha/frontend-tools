import { essentials, node, test, typescript } from '@wakamsha/eslint-config';

export default [
  {
    files: ['**/*.js'],
  },

  ...essentials,
  ...node,
  ...typescript,
  ...test.essentials,

  {
    rules: {
      'import/no-default-export': ['off'],
      'n/no-unsupported-features/node-builtins': ['off'],
      'unicorn/filename-case': ['off'],
    },
  },
  {
    files: ['**/*.config.{js,ts}'],
    rules: {
      'no-restricted-exports': ['off'],
      'import/no-extraneous-dependencies': ['off'],
    },
  },
];
