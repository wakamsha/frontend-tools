import { defineConfig } from 'oxlint';
import essentials from './src/configs/essentials.ts';
import typescript from './src/configs/typescript.ts';

export default defineConfig({
  extends: [essentials, typescript],
  overrides: [
    {
      files: ['./src/{configs,rules}/**/*.ts'],
      rules: {
        'import/no-default-export': ['off'],
        'unicorn/filename-case': ['off'],
      },
    },
  ],
});
