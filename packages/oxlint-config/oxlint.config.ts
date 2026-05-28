import { defineConfig } from 'oxlint';
import essentials from './configs/essentials.ts';
import typescript from './configs/typescript.ts';

export default defineConfig({
  extends: [essentials, typescript],
  overrides: [
    {
      files: ['./{configs,rules}/*.ts'],
      rules: {
        'import/no-default-export': ['off'],
        'unicorn/filename-case': ['off'],
      },
    },
  ],
});
