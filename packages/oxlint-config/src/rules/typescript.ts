import { defineConfig } from 'oxlint';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{ts,tsx,cts,mts}'],
      plugins: ['typescript'],
      rules: {
        'typescript/ban-ts-comment': [
          'error',
          {
            minimumDescriptionLength: 10,
          },
        ],
        'typescript/consistent-return': ['off'],
        'typescript/consistent-type-definitions': ['error', 'type'],
        'typescript/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports',
          },
        ],
        'typescript/explicit-function-return-type': ['off'],
        'typescript/explicit-member-accessibility': ['off'],
        'typescript/explicit-module-boundary-types': ['off'],
        'typescript/no-explicit-any': ['off'],
        'typescript/no-floating-promises': [
          'error',
          {
            ignoreIIFE: true,
          },
        ],
        'typescript/no-import-type-side-effects': ['off'],
        'typescript/no-unsafe-type-assertion': ['off'],
        'typescript/non-nullable-type-assertion-style': ['off'],
        'typescript/parameter-properties': ['off'],
        'typescript/prefer-promise-reject-errors': ['off'],
        'typescript/prefer-readonly-parameter-types': ['off'],
        'typescript/strict-boolean-expressions': ['warn'],
        'typescript/restrict-plus-operands': [
          'error',
          {
            allowAny: false,
            allowBoolean: false,
            allowNullish: false,
            allowNumberAndString: false,
            allowRegExp: false,
          },
        ],
        'typescript/return-await': ['error', 'error-handling-correctness-only'],
      },
    },
  ],
});
