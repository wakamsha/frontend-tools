import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.ts';
import node from '../../src/configs/node.ts';

export default defineConfig({
  extends: [essentials, node],
});
