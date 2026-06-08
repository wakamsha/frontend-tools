import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.ts';
import testEssentials from '../../src/configs/test/essentials.ts';
import typescript from '../../src/configs/typescript.ts';

export default defineConfig({
  extends: [essentials, typescript, testEssentials],
});
