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
        'typescript/strict-void-return': ['off'],
        'typescript/return-await': ['error', 'error-handling-correctness-only'],
      },
    },
    {
      // for JavaScript
      // The `typescript` plugin enabled in the override above is loaded
      // globally by oxlint, so `essentials`' top-level `categories` activate
      // type-aware rules on every file — including `.js`. The `no-unsafe-*`
      // family fires purely because a value is `any`, which is unavoidable in
      // untyped JavaScript without JSDoc type annotations, so disable just that
      // family for JS. Other type-aware rules (e.g. strict-boolean-expressions,
      // restrict-plus-operands) are satisfiable with idiomatic JS and are
      // intentionally left on.
      files: ['**/*.{js,cjs,mjs,jsx}'],
      rules: {
        'typescript/no-unsafe-argument': ['off'],
        'typescript/no-unsafe-assignment': ['off'],
        'typescript/no-unsafe-call': ['off'],
        'typescript/no-unsafe-member-access': ['off'],
        'typescript/no-unsafe-return': ['off'],
        'typescript/no-unsafe-unary-minus': ['off'],
      },
    },
  ],
});
