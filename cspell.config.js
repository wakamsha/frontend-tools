// oxlint-disable no-useless-spread
import { defineConfig } from 'cspell';

export default defineConfig({
  $schema:
    'https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json',
  dictionaries: [
    'bash',
    'css',
    'en_US',
    'fonts',
    'filetypes',
    'html',
    'misc',
    'node',
    'npm',
    'softwareTerms',
    'typescript',
  ],
  ignorePaths: ['./pnpm-lock.yaml'],
  words: [
    // OSS-related terms
    ...['stylelint'],
    // Other terms
    ...['conventionalcommits', 'flatconfig'],
  ],
});
