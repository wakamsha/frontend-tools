import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.ts';
import jsdoc from '../../src/configs/jsdoc.ts';
import nextjs from '../../src/configs/nextjs.ts';
import react from '../../src/configs/react.ts';
import typescript from '../../src/configs/typescript.ts';

export default defineConfig({
  extends: [essentials, react, typescript, nextjs, jsdoc],
});
