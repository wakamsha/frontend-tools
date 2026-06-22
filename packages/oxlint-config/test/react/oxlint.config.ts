import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.js';
import jsdoc from '../../src/configs/jsdoc.js';
import react from '../../src/configs/react.js';
import typescript from '../../src/configs/typescript.js';

export default defineConfig({
  extends: [essentials, typescript, jsdoc, react],
});
