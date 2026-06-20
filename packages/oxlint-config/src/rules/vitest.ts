import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      plugins: ['vitest'],
      rules: {
        'vitest/consistent-test-filename': ['warn'],
        'vitest/no-large-snapshots': ['warn'],
        'vitest/no-standalone-expect': ['warn'],
        'vitest/require-hook': ['off'],
        'vitest/require-top-level-describe': ['warn'],
        'vitest/prefer-expect-assertions': ['off'],
        'vitest/prefer-snapshot-hint': ['warn'],
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
