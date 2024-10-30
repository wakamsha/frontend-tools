import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    globals: true,
    include: ['test/**/*.test.ts'],
    exclude: ['test/**/dummy.test.ts'],
  },
});
