import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.js';
import typescript from '../../src/configs/typescript.js';

export default defineConfig({
  extends: [essentials, typescript],
});
