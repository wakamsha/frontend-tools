import { defineConfig } from 'oxlint';
import nodeRuleSet from '../rules/node.js';

export default defineConfig({
  extends: [nodeRuleSet],
});
