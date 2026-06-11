import { getESLintConfig } from '../helper.ts';

test('should match ESLint Configuration snapshot: node', async () => {
  const filePath = 'index.test.js';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const config = await getESLintConfig(filePath, import.meta.dirname);

  expect(config).toMatchSnapshot();
});
