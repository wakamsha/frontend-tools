import { defineFlatConfig } from 'eslint-define-config';
import importPlugin from 'eslint-plugin-import';

const config = defineFlatConfig({
  plugins: {
    import: importPlugin,
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.json'],
      },
    },
    'import/extensions': ['.js', '.mjs', '.jsx', 'ts', 'tsx'],
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },

  rules: {
    ...importPlugin.configs.recommended.rules,
    ...importPlugin.configs.errors.rules,

    /*
     * Static analysis:
     */

    // Disable to allow absolute path imports to the workspace packages
    // ワークスペースのパッケージを絶対パスで参照可能にするために無効化する。
    'import/no-unresolved': ['off'],

    // ensure named imports coupled with named exports
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md#when-not-to-use-it
    'import/named': ['error'],

    // ensure default import coupled with default export
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md#when-not-to-use-it
    'import/default': ['off'],

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
    'import/namespace': ['off'],
  },
});

export default config;
