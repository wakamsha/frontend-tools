import { defineConfig } from 'oxlint';
import jsdocRuleSet from '../rules/jsdoc.js';

export default defineConfig({
  extends: [jsdocRuleSet],
});
