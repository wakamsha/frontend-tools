import { defineConfig } from 'oxlint';
import nodeRuleSet from '../rules/node.ts';

export default defineConfig({
  extends: [nodeRuleSet],
});
