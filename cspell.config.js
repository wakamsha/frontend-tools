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
  ignorePaths: ['./pnpm-lock.yaml', './.vscode/**', '**/__snapshots__/**'],
  words: [
    // OSS-related terms
    ...['oxc', 'oxlint', 'tsgolint', 'stylelint'],
    // Lint Rules terms
    ...['defaultstatus', 'nonconstructor', 'nonoctal', 'textnodes'],
    // Other terms
    ...['conventionalcommits', 'flatconfig', 'wakamsha'],
  ],
});
