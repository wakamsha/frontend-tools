import { defineConfig } from 'oxlint';
import essentials from '../../configs/essentials.ts';
import testEssentials from '../../configs/test/essentials.ts';
import typescript from '../../configs/typescript.ts';

export default defineConfig({
  extends: [essentials, typescript, testEssentials],
});
