// @ts-check
import jestDomConfig from '../../rules/jest-dom.js';
import testingLibraryReactConfig from '../../rules/testing-library/react.js';

export default [
  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    ...jestDomConfig,
  },

  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    ...testingLibraryReactConfig,
  },
];
