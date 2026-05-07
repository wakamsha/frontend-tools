import { defineConfig } from 'oxlint';

export default defineConfig({
  // plugins: ['eslint'],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'error',
    perf: 'error',
    style: 'error',
    restriction: 'error',
  },

  rules: {
    'accessor-pairs': ['off'],
    'capitalized-comments': ['off'],
    'class-methods-use-this': ['off'],
    complexity: ['off'],
    curly: ['error', 'multi-line'],
    'default-case': ['off'],
    'func-name-matching': ['off'],
    'func-style': ['off'],
    'getter-return': [
      'error',
      {
        allowImplicit: true,
      },
    ],
    'id-length': ['off'],
    'init-declarations': ['off'],
    'max-classes-per-file': ['off'],
    'max-depth': ['off'],
    'max-lines': ['off'],
    'max-lines-per-function': ['off'],
    'max-nested-callbacks': ['off'],
    'max-params': ['off'],
    'max-statements': ['off'],
    'no-bitwise': ['off'],
    'no-console': [
      'warn',
      {
        allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
      },
    ],
    'no-div-regex': ['off'],
    'no-duplicate-imports': ['off'],
    'no-eq-null': ['off'],
    'no-implicit-coercion': [
      'error',
      {
        boolean: false,
        number: true,
        string: true,
        allow: [],
      },
    ],
    'no-inline-comments': ['off'],
    'no-magic-numbers': ['off'],
    'no-negated-condition': ['off'],
    'no-nested-ternary': ['off'],
    'no-redeclare': ['off'],
    'no-restricted-properties': [
      'error',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        property: '__defineGetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        object: 'Math',
        property: 'pow',
        message: 'Use the exponentiation operator (**) instead.',
      },
    ],
    'no-shadow': ['off'],
    'no-ternary': ['off'],
    'no-undefined': ['off'],
    'no-unmodified-loop-condition': ['off'],
    'no-unused-private-class-members': ['off'],
    'no-use-before-define': ['off'],
    'no-useless-call': ['off'],
    'no-warning-comments': ['off'],
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: true,
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-promise-reject-errors': ['off'],
    'require-await': ['off'],
    'require-unicode-regexp': ['off'],
    'sort-imports': ['off'],
    'sort-keys': ['off'],
    'sort-vars': ['off'],
  },
});
