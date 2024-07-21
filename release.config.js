/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        parserOpts: {
          // see: https://github.com/semantic-release/commit-analyzer/issues/231#issuecomment-1242113093
          breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        parserOpts: {
          // see: https://github.com/semantic-release/commit-analyzer/issues/231#issuecomment-1242113093
          breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
        },
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      },
    ],
    '@semantic-release/github',
  ],
};
