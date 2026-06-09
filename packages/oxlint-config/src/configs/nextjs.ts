import { defineConfig } from 'oxlint';
import nextjsRuleset from '../rules/nextjs.ts';

export default defineConfig({
  extends: [nextjsRuleset],
});
