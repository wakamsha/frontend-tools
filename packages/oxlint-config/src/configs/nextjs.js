import { defineConfig } from 'oxlint';
import nextjsRuleset from '../rules/nextjs.js';

export default defineConfig({
  extends: [nextjsRuleset],
});
