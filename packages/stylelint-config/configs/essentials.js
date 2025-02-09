export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],

  rules: {
    // Exclude `grid-template` to be able to use `grid-template-areas`.
    // https://stylelint.io/user-guide/rules/declaration-block-no-redundant-longhand-properties/
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['grid-template'],
      },
    ],
  },
};
