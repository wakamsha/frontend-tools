import { getESLintConfig } from '../helper.ts';

test('should match ESLint Configuration snapshot: storybook', async () => {
  const filePath = 'dummy.stories.tsx';
  const config = await getESLintConfig(filePath, import.meta.dirname);

  expect(config).toMatchSnapshot();
});
