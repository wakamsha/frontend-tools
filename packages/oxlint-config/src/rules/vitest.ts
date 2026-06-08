import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      plugins: ['vitest'],
      rules: {
        'vitest/require-hook': ['off'],
        'vitest/prefer-expect-assertions': ['off'],
        'vitest/prefer-importing-vitest-globals': ['off'],
        'vitest/require-test-timeout': ['off'],
        'vitest/valid-title': [
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
