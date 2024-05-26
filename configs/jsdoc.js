import { defineFlatConfig } from 'eslint-define-config';
import jsdocConfig from '../rules/jsdoc.js';

export default defineFlatConfig([
  jsdocConfig.ts,

  {
    files: ['*.@(js|cjs|mjs)'],
    ...jsdocConfig.js,
  },
]);
