import { defineConfig } from 'oxlint';

export default defineConfig({
  // plugins: ['oxc'],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'error',
    perf: 'error',
    style: 'error',
    restriction: 'error',
  },
});
