import { defineConfig } from 'oxlint';
import jsdocRuleSet from '../rules/jsdoc.ts';

export default defineConfig({
  extends: [jsdocRuleSet],
});
