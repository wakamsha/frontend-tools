import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      plugins: ['jest'],
      rules: {
        'jest/no-hooks': ['warn'],
        'jest/require-hook': ['off'],
        'jest/prefer-expect-assertions': ['off'],
        'jest/prefer-importing-jest-globals': ['off'],
        'jest/prefer-to-have-been-called-times': ['off'],
        'jest/valid-title': [
          'error',
          {
            allowArguments: false,
            ignoreTypeOfDescribeName: true,
          },
        ],
      },
    },
  ],
});
