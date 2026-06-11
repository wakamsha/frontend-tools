import { loadESLint } from 'eslint';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

/**
 * Resolves the resolved oxlint configuration for a given directory.
 *
 * oxlint exposes no Node.js API for resolving configuration, so this shells out
 * to `oxlint --print-config`. The working directory determines which
 * `oxlint.config.ts` is picked up.
 *
 * @param cwd Absolute path to a directory that contains an `oxlint.config.ts`.
 *
 * @returns The resolved oxlint configuration as a plain object.
 */
export function getOxlintConfig(cwd: string): unknown {
  const oxlintEntry = fileURLToPath(import.meta.resolve('oxlint'));
  const oxlintBin = path.resolve(
    path.dirname(oxlintEntry),
    '..',
    'bin',
    'oxlint',
  );

  const stdout = execFileSync(oxlintBin, ['--print-config'], {
    cwd,
    encoding: 'utf8',
  });

  return JSON.parse(stdout) as unknown;
}
