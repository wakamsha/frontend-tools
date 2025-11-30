# oxlint-config

[![Version](https://img.shields.io/npm/v/@wakamsha/oxlint-config.svg?style=flat-square)](https://www.npmjs.com/package/@wakamsha/oxlint-config?activeTab=versions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

wakamsha's oxlint rules as an extensible shared config.

## Usage

### 1. Install dependencies (and peer dependencies)

```bash
npm install --save-dev @wakamsha/oxlint-config oxlint
```

### 2. Configure oxlint

Within your oxlint config file (`.oxlintrc.json`):

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@wakamsha/oxlint-config/essentials.json"]
}
```

If you need TypeScript Support:

```diff
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/@wakamsha/oxlint-config/essentials.json",
+   "./node_modules/@wakamsha/oxlint-config/typescript.json",
  ]
}
```

Must be added after `essentials`.

We also provide various other rule sets that you can configure to suit your project.

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/@wakamsha/oxlint-config/essentials.json",
    "./node_modules/@wakamsha/oxlint-config/jsdoc.json",
    "./node_modules/@wakamsha/oxlint-config/node.json",
    "./node_modules/@wakamsha/oxlint-config/react.json",
    "./node_modules/@wakamsha/oxlint-config/test-essentials.json",
    "./node_modules/@wakamsha/oxlint-config/typescript.json"
  ]
}
```

|          Rule set | Summary                                                |
| ----------------: | ------------------------------------------------------ |
|      `essentials` | Contains basic, import, and promise recommended rules. |
|           `jsdoc` | Contains JSDoc recommended rules.                      |
|            `node` | Contains Node.js recommended rules.                    |
|           `react` | Contains React and jsx-a11y recommended rules.         |
| `test-essentials` | Contains Vitest rules.                                 |
|      `typescript` | Contains TypeScript recommended rules.                 |

## Integration with ESLint

You can integrate oxlint with ESLint using the [oxlint-eslint-plugin](https://www.npmjs.com/package/oxlint-eslint-plugin) if you still need ESLint that oxlint does not cover yet.

```js
import oxlint from 'eslint-plugin-oxlint';

export default [
  // Other ESLint configs...

  ...oxlint.configs['flat/all'],
];
```

Then, run ESLint after oxlint:

```bash
npx oxlint && npx eslint
```

## Versioning

- Increment major version: Changed **error** rules.
- Increment minor version: Changed **warn** rules.
- Increment patch version: Not changed **error** and **warn** rules.

## License

Open source [licensed as MIT](https://github.com/wakamsha/frontend-tools/tree/main/packages/oxlint-config/LICENSE).
