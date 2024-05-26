# eslint-config

[![Version](https://img.shields.io/npm/v/@wakamsha/eslint-config.svg?style=flat-square)](https://www.npmjs.com/package/@wakamsha/eslint-config?activeTab=versions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
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
import essentials from '@wakamsha/eslint-config/essentials.js';

export default [...essentials];
```

If you need TypeScript Support:

```diff
 import essentials from '@wakamsha/eslint-config/essentials.js';
+import typescript from '@wakamsha/eslint-config/typescript.js';

 export default [
   ...essentials,
+  ...typescript,
 ];
```

Must be added after `essentials`.

We also provide various other rule sets that you can configure to suit your project.

```js
import essentials from '@wakamsha/eslint-config/essentials.js';
import jsdoc from '@wakamsha/eslint-config/jsdoc.js';
import react from '@wakamsha/eslint-config/react.js';
import testReact from '@wakamsha/eslint-config/test/react.js';
import typescript from '@wakamsha/eslint-config/typescript.js';

export default [...essentials, ...jsdoc, ...react, ...testReact, ...typescript];
```

|     Rule set | Summary                                               | Dependencies                                                                                                                                                                                                                                                                        |
| -----------: | :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `essentials` | Contains basic, import, and promise recommended rules | [`eslint`](https://eslint.org/) <br> [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise) <br> [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import)                                                                          |
|      `jsdoc` | Contains JSDoc recommended rules                      | [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc)                                                                                                                                                                                                               |
|      `react` | Contains React and jsx-a11y recommended rules         | [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) <br> [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) <br> [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) |
| `test/react` | Contains Vitest and React Testing Library rules       | [`eslint-plugin-vitest`](https://github.com/veritem/eslint-plugin-vitest) <br> [`eslint-plugin-jest-dom`](https://github.com/testing-library/eslint-plugin-jest-dom) <br> [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library)       |
| `typescript` | Contains TypeScript recommended rules                 | [`@eslint-typescript/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin) <br> [`@eslint-typescript/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser)                                  |

## Using Prettier

If you use [Prettier](https://prettier.io/) to format your code, you must disable any rules in `@wakamsha/eslint-config/essentials` that conflict with Prettier.

### 1. Install dependencies

```bash
npm install --save-dev eslint-config-prettier
```

### 2. Configure ESLint

Within your ESLint config file:

```diff
 import essentials from '@wakamsha/eslint-config/essentials.js';
 import typescript from '@wakamsha/eslint-config/typescript.js';
+import prettier from 'eslint-config-prettier';


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
  eslint-plugin-jsdoc \
  eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-vitest eslint-plugin-jest-dom eslint-plugin-testing-library \
  @eslint-typescript/eslint-plugin @eslint-typescript/parser
```

## Versioning

- Increment major version: Changed **error** rules.
- Increment minor version: Changed **warn** rules.
- Increment patch version: Not changed **error** and **warn** rules.

## License

Open source [licensed as MIT](https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/LICENSE).
