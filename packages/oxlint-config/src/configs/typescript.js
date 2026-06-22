import { defineConfig } from 'oxlint';
import typescriptRuleSet from '../rules/typescript.js';

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  extends: [typescriptRuleSet],
});
