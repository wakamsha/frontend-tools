// @ts-check
import { defineFlatConfig } from 'eslint-define-config';
import jestDomConfig from '../../rules/jest-dom.js';
import testingLibraryReactConfig from '../../rules/testing-library/react.js';
import vitestConfig from '../../rules/vitest.js';

export default defineFlatConfig([
  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    ...vitestConfig,
  },

  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    ...jestDomConfig,
  },

  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    ...testingLibraryReactConfig,
  },
]);
