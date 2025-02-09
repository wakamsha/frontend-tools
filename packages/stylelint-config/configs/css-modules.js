export default {
  rules: {
    // https://stylelint.io/user-guide/rules/function-no-unknown/
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['global'],
      },
    ],

    // https://stylelint.io/user-guide/rules/property-no-unknown/
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],

    // https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown/
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
};
