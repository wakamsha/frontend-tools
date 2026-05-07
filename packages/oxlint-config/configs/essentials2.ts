import { defineConfig } from 'oxlint';
import eslint from '../rules/eslint.ts';
import oxc from '../rules/oxc.ts';

export default defineConfig({
  plugins: ['eslint', 'oxc'],
  extends: [eslint, oxc],
  env: {
    builtin: true,
    es2024: true,
  },
  ignorePatterns: ['**/bin/*', '**/build/*', '**/dist/*', '**/node_modules/*'],
});
