import { essentials, react } from '@wakamsha/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [essentials, react],
});
