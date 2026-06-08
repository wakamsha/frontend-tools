// @ts-check
import { essentials, node, test, typescript } from './configs/index.js';

export default [
  {
    files: ['**/*.{js,ts}'],
  },

  ...essentials,
  ...node,
  ...test.essentials,
  ...typescript,

  {
    files: ['**/*.{js,ts}'],
    rules: {
      'import/no-default-export': ['off'],
      'n/no-unsupported-features/node-builtins': ['off'],
      'unicorn/filename-case': ['off'],
    },
  },
];
