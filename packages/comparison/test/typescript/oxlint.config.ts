import { essentials, typescript } from '@wakamsha/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [essentials, typescript],
});
