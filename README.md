# eslint-config

[![Version](https://img.shields.io/npm/v/@wakamsha/eslint-config.svg?style=flat-square)](https://www.npmjs.com/package/@wakamsha/eslint-config?activeTab=versions)
[![License](https://img.shields.io/github/license/wakamsha/eslint-config.svg?style=flat-square)](https://github.com/wakamsha/eslint-config/blob/main/LICENSE)

wakamsha's ESLint rules as an extensible shared config.

> [!WARNING]
> As of now, it does not work with eslint 9 as most plugins haven't updated yet. Please stay with eslint 8.57.0!

## Usage

> [!IMPORTANT]
> Only ESM and ESLint FlatConfig

### 1. Install dependencies (and peer dependencies)

```bash
npm install --save-dev @wakamsha/eslint-config eslint
```

### 2. Configure ESLint

Within your ESLint config file (`eslint.config.js`):

```js
import essentials from '@wakamsha/eslint-config/essentials';

export default [...essentials];
```

If you need TypeScript Support:

```diff
 import essentials from '@wakamsha/eslint-config/essentials';
+import typescript from '@wakamsha/eslint-config/typescript';

 export default [
   ...essentials,
+  ...typescript,
 ];
```

Must be added after `essentials`.

|     Rule set | Summary                                               | Dependencies                                                                                                                                                                                                                                       |
| -----------: | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `essentials` | Contains basic, import, and promise recommended rules | [`eslint`](https://eslint.org/) <br> [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise) <br> [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import)                                         |
| `typescript` | Contains TypeScript recommended rules                 | [`@eslint-typescript/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin) <br> [`@eslint-typescript/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser) |

## Using Prettier

If you use [Prettier](https://prettier.io/) to format your code, you must disable any rules in `@wakamsha/eslint-config/essentials` that conflict with Prettier.

### 1. Install dependencies

```bash
npm install --save-dev eslint-config-prettier
```

### 2. Configure ESLint

Within your ESLint config file:

```diff
 import essentials from '@wakamsha/eslint-config/essentials';
 import typescript from '@wakamsha/eslint-config/typescript';
 import prettier from 'eslint-config-prettier';


 export default [
   ...essentials,
   ...typescript,
+  prettier,
 ];
```

By adding the `prettier` configuration to `extends` in the ESLint configuration, you can disable all rules in `essentials` that conflict with Prettier.

## Migrate from an existing configuration

@wakamsha/eslint-config contains various plugins related to different rule sets. Therefore, users don't need to install them separately. If you have installed them in your existing configuration, we recommend uninstalling them.

```bash
npm uninstall eslint-plugin-promise eslint-plugin-import \
  @eslint-typescript/eslint-plugin @eslint-typescript/parser
```

## Versioning

- Increment major version: Changed **error** rules.
- Increment minor version: Changed **warn** rules.
- Increment patch version: Not changed **error** and **warn** rules.

## License

Open source [licensed as MIT](https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/LICENSE).
