import { getESLintConfig } from '../helper.ts';

describe('ESLint Configuration Snapshot Tests', () => {
  beforeAll(() => {
    process.env.TSCONFIG_ROOT_DIR = '/dummy';
  });

  test('should match ESLint Configuration snapshot: test', async () => {
    const filePath = 'dummy.test.ts';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const config = await getESLintConfig(filePath, import.meta.dirname);

    expect(config).toMatchSnapshot();
  });

  afterAll(() => {
    process.env.TSCONFIG_ROOT_DIR = undefined;
  });
});
