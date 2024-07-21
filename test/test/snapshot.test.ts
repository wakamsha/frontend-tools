import { getESLintConfig } from '../helper.ts';

test('should match ESLint Configuration snapshot: test', async () => {
  const filePath = 'dummy.test.ts';
  const config = await getESLintConfig(filePath, import.meta.dirname);

  expect(config).toMatchSnapshot();
});
