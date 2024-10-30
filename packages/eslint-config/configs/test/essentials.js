// @ts-check
import vitestConfig from '../../rules/vitest.js';

export default [
  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    ...vitestConfig,
  },
];
