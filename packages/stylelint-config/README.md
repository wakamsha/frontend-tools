# stylelint-config

[![Version](https://img.shields.io/npm/v/@wakamsha/stylelint-config.svg?style=flat-square)](https://www.npmjs.com/package/@wakamsha/stylelint-config?activeTab=versions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

wakamsha's Stylelint rules as an extensible shared config.

## Usage

### 1. Install dependencies (and peer dependencies)

```bash
npm install --save-dev @wakamsha/stylelint-config stylelint
```

### 2. Configure Stylelint

Within your Stylelint config file (`stylelint.config.js`):

```js
export default {
  extends: ['@wakamsha/stylelint-config'],
};
```

If the value of a rule does not suit you, specify that rule in the "rules" section with the value you want:

```diff
export default {
  extends: ['@wakamsha/stylelint-config'],
+ rules: {
+   value-keyword-case': null,
+ },
};
```

## Versioning

- Increment major version: Changed **error** rules.
- Increment minor version: Changed **warn** rules.
- Increment patch version: Not changed **error** and **warn** rules.

## License

Open source [licensed as MIT](https://github.com/wakamsha/frontend-tools/tree/main/packages/stylelint-config/LICENSE).
