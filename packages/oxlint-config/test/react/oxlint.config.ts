import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.ts';
import jsdoc from '../../src/configs/jsdoc.ts';
import react from '../../src/configs/react.ts';
import typescript from '../../src/configs/typescript.ts';

export default defineConfig({
  extends: [essentials, typescript, jsdoc, react],
});
