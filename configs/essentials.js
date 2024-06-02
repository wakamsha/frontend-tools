// @ts-check
import bestPracticesRuleSet from '../rules/best-practices.js';
import errorsRuleSet from '../rules/errors.js';
import es6RuleSet from '../rules/es6.js';
import importsRuleSet from '../rules/imports.js';
import promiseRuleSet from '../rules/promise.js';
import styleRuleSet from '../rules/style.js';
import variablesRuleSet from '../rules/variables.js';

export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
  },

  bestPracticesRuleSet,
  errorsRuleSet,
  es6RuleSet,
  styleRuleSet,
  variablesRuleSet,
  importsRuleSet,
  promiseRuleSet,
];
