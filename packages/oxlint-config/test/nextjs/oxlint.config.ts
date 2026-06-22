import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.js';
import jsdoc from '../../src/configs/jsdoc.js';
import nextjs from '../../src/configs/nextjs.js';
import react from '../../src/configs/react.js';
import typescript from '../../src/configs/typescript.js';

export default defineConfig({
  extends: [essentials, react, typescript, nextjs, jsdoc],
});
