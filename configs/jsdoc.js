// @ts-check
import jsdocConfig from '../rules/jsdoc.js';

export default [
  jsdocConfig.ts,

  {
    files: ['*.@(js|cjs|mjs)'],
    ...jsdocConfig.js,
  },
];
