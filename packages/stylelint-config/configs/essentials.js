export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-standard",
    "stylelint-config-recess-order",
  ],

  rules: {
    "declaration-block-no-redundant-longhand-properties": [
      true,
      {
        ignoreShorthands: ["grid-template"],
      },
    ],
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: ["text-size-adjust", "background-clip"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
  },
};
