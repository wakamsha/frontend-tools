import { loadESLint } from 'eslint';

/**
 * This method calculates the ESLint configuration for a given file path.
 *
 * @param filePath The path to the file whose configuration you would like to calculate. Directory paths are forbidden because ESLint cannot handle the overrides setting.
 *
 * @param cwd The working directory. This must be an absolute path.
 *
 * @returns The path to the file whose configuration you would like to calculate. Directory paths are forbidden because ESLint cannot handle the overrides setting.
 */
export async function getESLintConfig(filePath: string, cwd = './') {
  const DefaultESLint = await loadESLint({
    useFlatConfig: true,
  });

  const eslint = new DefaultESLint({
    cwd,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return eslint.calculateConfigForFile(filePath);
}
