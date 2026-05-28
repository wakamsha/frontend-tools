import { defineConfig } from 'oxlint';
import essentials from '../../configs/essentials.ts';
import node from '../../configs/node.ts';

export default defineConfig({
  extends: [essentials, node],
});
