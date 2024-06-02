import { getESLintConfig } from '../helper.ts';

test('should match ESLint Configuration snapshot: node', async () => {
  const filePath = 'index.test.js';
  const config = await getESLintConfig(filePath, import.meta.dirname);

  expect(config).toMatchSnapshot();
});
