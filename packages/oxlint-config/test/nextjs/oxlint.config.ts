import { defineConfig } from 'oxlint';
import essentials from '../../configs/essentials.ts';
import jsdoc from '../../configs/jsdoc.ts';
import nextjs from '../../configs/nextjs.ts';
import react from '../../configs/react.ts';
import typescript from '../../configs/typescript.ts';

export default defineConfig({
  extends: [essentials, react, typescript, nextjs, jsdoc],
});
