import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Absolute path to the oxlint-config package root.
 */
export const packageRoot = path.resolve(scriptDir, '..');

/**
 * JSON schema path embedded into generated config files.
 */
export const schemaPath = '../node_modules/oxlint/configuration_schema.json';

const schemaAbsolutePath = path.resolve(
  packageRoot,
  'node_modules/oxlint/configuration_schema.json',
);

type ResolveTargetOptions = {
  excludeBaseNames?: string[];
  recursive?: boolean;
};

async function collectTsFilesRecursively(dirPath: string): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.resolve(dirPath, entry.name);

      if (entry.isDirectory()) {
        return collectTsFilesRecursively(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith('.ts')) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return nested.flat();
}

/**
 * Resolves target TypeScript files from CLI args or by scanning a source directory.
 *
 * @param sourceDir Directory that contains source TypeScript files.
 *
 * @param inputArgs CLI arguments used to narrow generation targets.
 *
 * @param options Additional filters for resolving targets.
 *
 * `options.recursive` scans child directories as well.
 *
 * @returns Absolute paths of target TypeScript files.
 */
export async function resolveTargetTsFiles(
  sourceDir: string,
  inputArgs: string[],
  options: ResolveTargetOptions = {},
): Promise<string[]> {
  const excludeSet = new Set(options.excludeBaseNames);

  if (inputArgs.length === 0) {
    const targets = options.recursive
      ? await collectTsFilesRecursively(sourceDir)
      : await (async () => {
          const entries = await readdir(sourceDir);
          return entries
            .filter((entry) => entry.endsWith('.ts'))
            .map((entry) => path.resolve(sourceDir, entry));
        })();

    return targets.filter(
      (target) => !excludeSet.has(path.basename(target, '.ts')),
    );
  }

  return inputArgs
    .map((target) => (target.endsWith('.ts') ? target : `${target}.ts`))
    .map((target) =>
      path.isAbsolute(target) ? target : path.resolve(sourceDir, target),
    )
    .filter((target) => !excludeSet.has(path.basename(target, '.ts')));
}

/**
 * Imports a TypeScript config file and returns its default export.
 *
 * @param filePath Absolute path to a TypeScript module.
 *
 * @returns Default-exported config object from the module.
 */
export async function importConfigFromTsFile(
  filePath: string,
): Promise<Record<string, unknown>> {
  const moduleUrl = pathToFileURL(filePath).href;
  const loadedModule = await import(moduleUrl);
  const config = loadedModule.default;

  if (!config || typeof config !== 'object') {
    throw new TypeError(`Default export is not a config object: ${filePath}`);
  }

  return config as Record<string, unknown>;
}

/**
 * Resolves the output JSON path for a source TypeScript file.
 *
 * @param sourceFilePath Source TypeScript file path.
 *
 * @param outputDir Directory where the JSON file is written.
 *
 * @param sourceBaseDir Optional base directory used to preserve nested structure.
 *
 * @returns Absolute output path for the generated JSON file.
 */
export function resolveJsonOutputPath(
  sourceFilePath: string,
  outputDir: string,
  sourceBaseDir?: string,
): string {
  const relativeSourcePath = sourceBaseDir
    ? path.relative(sourceBaseDir, sourceFilePath)
    : path.basename(sourceFilePath);
  const outputRelativePath = relativeSourcePath.replace(/\.ts$/, '.json');

  return path.resolve(outputDir, outputRelativePath);
}

/**
 * Resolves the `$schema` relative path for a generated JSON file.
 *
 * @param outputPath Absolute path to the generated JSON file.
 *
 * @returns Relative path from JSON location to oxlint schema.
 */
export function resolveSchemaPathForJson(outputPath: string): string {
  return path.relative(path.dirname(outputPath), schemaAbsolutePath);
}

/**
 * Writes a JSON file that shares the basename with the source TypeScript file.
 *
 * @param sourceFilePath Source TypeScript file path used to derive the JSON filename.
 *
 * @param outputDir Directory where the JSON file is written.
 *
 * @param output Serializable object written to the JSON file.
 *
 * @returns Relative path from package root to the generated JSON file.
 */
export async function writeJsonForTsFile(
  sourceFilePath: string,
  outputDir: string,
  output: Record<string, unknown>,
  sourceBaseDir?: string,
): Promise<string> {
  const outputPath = resolveJsonOutputPath(
    sourceFilePath,
    outputDir,
    sourceBaseDir,
  );

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  return path.relative(packageRoot, outputPath);
}
