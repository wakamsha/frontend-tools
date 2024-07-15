// @ts-check
import { essentials, node, test } from './configs/index.js';

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

  ...node,

  ...test.react,
];
