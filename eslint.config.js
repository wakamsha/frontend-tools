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
    },
  },

  ...node,

  ...test.react,
];
