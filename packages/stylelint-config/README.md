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
  extends: ['@wakamsha/stylelint-config/essentials'],
};
```

If you need CSS-in-JS Support:

```diff
export default {
- extends: ['@wakamsha/stylelint-config/essentials'],
+ extends: ['@wakamsha/stylelint-config/essentials', '@wakamsha/stylelint-config/css-in-js'],
};
```

Must be added after `essentials`.

We also provide various other rule sets that you can configure to suit your project.

If the value of a rule does not suit you, specify that rule in the "rules" section with the value you want:

```diff
export default {
  extends: ['@wakamsha/stylelint-config/essentials'],
+ rules: {
+   value-keyword-case': null,
+ },
};
```

|      Rule set | Summary                                     | Dependencies                                                                                                                                              |
| ------------: | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `essentials` | Contains standard, and recess-order configs | [`standard`](https://github.com/stylelint/stylelint-config-standard) <br> [`recess-order`](https://github.com/stormwarning/stylelint-config-recess-order) |
| `css-modules` | Contains CSS Modules config                 | -                                                                                                                                                         |
|   `css-in-js` | Contains CSS-in-JS config                   | [`postcss`](https://postcss.org/) <br> [`postcss-styled-syntax`](https://github.com/hudochenkov/postcss-styled-syntax)                                    |

## Migrate from an existing configuration

@wakamsha/stylelint-config contains various plugins related to different rule sets. Therefore, users don't need to install them separately. If you have installed them in your existing configuration, we recommend uninstalling them.

```bash
npm uninstall stylelint-config-standard \
    stylelint-config-recess-order \
    postcss-styled-syntax
```

## Versioning

- Increment major version: Changed **error** rules.
- Increment minor version: Changed **warn** rules.
- Increment patch version: Not changed **error** and **warn** rules.

## License

Open source [licensed as MIT](https://github.com/wakamsha/frontend-tools/tree/main/packages/stylelint-config/LICENSE).
