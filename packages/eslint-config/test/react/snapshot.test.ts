import { getESLintConfig } from '../helper.ts';

test('should match ESLint Configuration snapshot: react', async () => {
  const filePath = 'dummy.tsx';
  const config = await getESLintConfig(filePath, import.meta.dirname);

  expect(config).toMatchSnapshot();
});
