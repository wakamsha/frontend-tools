import { defineConfig } from 'oxlint';
import essentials from '../../src/configs/essentials.js';
import node from '../../src/configs/node.js';

export default defineConfig({
  extends: [essentials, node],
});
