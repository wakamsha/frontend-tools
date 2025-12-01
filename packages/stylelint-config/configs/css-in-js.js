export default {
  customSyntax: 'postcss-styled-syntax',
  rules: {
    'function-name-case': null,
    'function-no-unknown': null,
    'value-keyword-case': null,
    // Allow nesting selectors in CSS-in-JS such as emotion
    'nesting-selector-no-missing-scoping-root': null,
  },
};
