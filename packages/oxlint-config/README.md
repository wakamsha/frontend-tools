# oxlint-config

[![Version](https://img.shields.io/npm/v/@wakamsha/oxlint-config.svg?style=flat-square)](https://www.npmjs.com/package/@wakamsha/oxlint-config?activeTab=versions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

wakamsha's oxlint rules as an extensible shared config.

## Usage

### 1. Install dependencies (and peer dependencies)

```bash
npm install --save-dev @wakamsha/oxlint-config oxlint oxlint-tsgolint
```

### 2. Configure oxlint

Oxlint supports both `oxlint.config.ts` and `.oxlintrc.json`.
Use either one in the same directory (not both).

#### Option A: `oxlint.config.ts` (recommended)

```ts
import { defineConfig } from 'oxlint';
import { essentials } from '@wakamsha/oxlint-config';

export default defineConfig({
  extends: [essentials],
});
```

If you need TypeScript support:

```ts
import { defineConfig } from 'oxlint';
import { essentials, typescript } from '@wakamsha/oxlint-config';

export default defineConfig({
  extends: [essentials, typescript],
});
```

`typescript` must be added after `essentials`.

You can also combine other provided rule sets:

```ts
import { defineConfig } from 'oxlint';
import {
  essentials,
  jsdoc,
  nextjs,
  node,
  react,
  test,
  typescript,
} from '@wakamsha/oxlint-config';

export default defineConfig({
  extends: [
    essentials,
    typescript,
    jsdoc,
    node,
    react,
    nextjs,
    test.essentials,
  ],
});
```

#### Option B: `.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@wakamsha/oxlint-config/configs/essentials.json"]
}
```

If you need TypeScript support:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/@wakamsha/oxlint-config/configs/essentials.json",
    "./node_modules/@wakamsha/oxlint-config/configs/typescript.json"
  ]
}
```

You can combine other JSON presets as well (for example `react.json`, `nextjs.json`, `test/essentials.json`).

|          Rule set | Summary                                                |
| ----------------: | ------------------------------------------------------ |
|      `essentials` | Contains basic, import, and promise recommended rules. |
|           `jsdoc` | Contains JSDoc recommended rules.                      |
|            `node` | Contains Node.js recommended rules.                    |
|           `react` | Contains React and jsx-a11y recommended rules.         |
|          `nextjs` | Contains Next.js recommended rules.                    |
| `test.essentials` | Contains Vitest and Jest rules.                        |
|      `typescript` | Contains TypeScript recommended rules.                 |

## Integration with ESLint

You can integrate oxlint with ESLint using the [eslint-plugin-oxlint](https://www.npmjs.com/package/eslint-plugin-oxlint) if you still need ESLint that oxlint does not cover yet. This plugin turns off all rules that are already covered by oxlint to avoid conflicts.

```js
import oxlint from 'eslint-plugin-oxlint';

export default [
  // Other ESLint configs...

  ...oxlint.configs['flat/all'],
];
```

Then, run ESLint after oxlint:

```bash
npx oxlint --type-aware && npx eslint
```

## Versioning

- Increment major version: Changed **error** rules.
- Increment minor version: Changed **warn** rules.
- Increment patch version: Not changed **error** and **warn** rules.

## License

Open source [licensed as MIT](https://github.com/wakamsha/frontend-tools/tree/main/packages/oxlint-config/LICENSE).
