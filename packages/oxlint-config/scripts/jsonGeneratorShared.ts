import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Absolute path to the oxlint-config package root.
 */
export const packageRoot = path.resolve(scriptDir, '..');

/**
 * Source directory for internal rule-set implementations.
 */
export const srcRulesDir = path.resolve(packageRoot, 'src/rules');

/**
 * Output directory for generated rule JSON presets.
 */
export const rulesOutputDir = path.resolve(packageRoot, 'rules-json');

/**
 * Source directory for internal config implementations.
 */
export const srcConfigsDir = path.resolve(packageRoot, 'src/configs');

/**
 * Output directory for generated config JSON presets.
 */
export const configsOutputDir = path.resolve(packageRoot, 'configs');

const schemaAbsolutePath = path.resolve(
  packageRoot,
  'node_modules/oxlint/configuration_schema.json',
);

type ResolveTargetOptions = {
  excludeBaseNames?: string[];
  recursive?: boolean;
};

async function collectJsFilesRecursively(dirPath: string): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.resolve(dirPath, entry.name);

      if (entry.isDirectory()) {
        return collectJsFilesRecursively(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith('.js')) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return nested.flat();
}

/**
 * Resolves target JavaScript files from CLI args or by scanning a source directory.
 *
 * @param sourceDir Directory that contains source JavaScript files.
 *
 * @param inputArgs CLI arguments used to narrow generation targets.
 *
 * @param options Additional filters for resolving targets.
 *
 * `options.recursive` scans child directories as well.
 *
 * @returns Absolute paths of target JavaScript files.
 */
export async function resolveTargetJsFiles(
  sourceDir: string,
  inputArgs: string[],
  options: ResolveTargetOptions = {},
): Promise<string[]> {
  const excludeSet = new Set(options.excludeBaseNames);

  if (inputArgs.length === 0) {
    const targets =
      options.recursive === true
        ? await collectJsFilesRecursively(sourceDir)
        : await (async () => {
            const entries = await readdir(sourceDir);
            return entries
              .filter((entry) => entry.endsWith('.js'))
              .map((entry) => path.resolve(sourceDir, entry));
          })();

    return targets.filter(
      (target) => !excludeSet.has(path.basename(target, '.js')),
    );
  }

  return inputArgs
    .map((target) => (target.endsWith('.js') ? target : `${target}.js`))
    .map((target) =>
      path.isAbsolute(target) ? target : path.resolve(sourceDir, target),
    )
    .filter((target) => !excludeSet.has(path.basename(target, '.js')));
}

/**
 * Imports a JavaScript config file and returns its default export.
 *
 * @param filePath Absolute path to a JavaScript module.
 *
 * @returns Default-exported config object from the module.
 */
export async function importConfigFromJsFile(
  filePath: string,
): Promise<Record<string, unknown>> {
  const moduleUrl = pathToFileURL(filePath).href;
  const loadedModule = (await import(moduleUrl)) as { default?: unknown };
  const config = loadedModule.default;

  if (config === null || typeof config !== 'object') {
    throw new TypeError(`Default export is not a config object: ${filePath}`);
  }

  return config as Record<string, unknown>;
}

/**
 * Resolves the output JSON path for a source JavaScript file.
 *
 * @param sourceFilePath Source JavaScript file path.
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
  const relativeSourcePath =
    sourceBaseDir !== undefined
      ? path.relative(sourceBaseDir, sourceFilePath)
      : path.basename(sourceFilePath);
  const outputRelativePath = relativeSourcePath.replace(/\.js$/, '.json');

  return path.resolve(outputDir, outputRelativePath);
}

/**
 * Resolves the `$schema` relative path for a generated JSON file.
 *
 * @param outputPath Absolute path to the generated JSON file.
 *
 * @returns Relative path from the JSON location to the oxlint schema.
 */
function resolveSchemaPathForJson(outputPath: string): string {
  return path.relative(path.dirname(outputPath), schemaAbsolutePath);
}

/**
 * Writes a generated JSON preset, injecting `$schema` as the first key.
 *
 * @param outputPath Absolute path the JSON file is written to.
 *
 * @param config Config object serialized after the `$schema` key.
 *
 * @returns Relative path from the package root to the generated JSON file.
 */
export async function writeJsonFile(
  outputPath: string,
  config: Record<string, unknown>,
): Promise<string> {
  const output = {
    $schema: resolveSchemaPathForJson(outputPath),
    ...config,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  return path.relative(packageRoot, outputPath);
}

/**
 * Runs a JSON generator: resolves target files (optionally narrowed by CLI
 * args), generates each, logs the results, and reports failures via the
 * process exit code.
 *
 * @param sourceDir Directory scanned for source JavaScript files.
 *
 * @param generate Produces a generated JSON file from a source path and
 * returns its package-relative path for logging.
 *
 * @param options Forwarded to {@link resolveTargetJsFiles}.
 */
export async function runGenerator(
  sourceDir: string,
  generate: (sourceFilePath: string) => Promise<string>,
  options: ResolveTargetOptions = {},
): Promise<void> {
  try {
    const targetArgs = process.argv.slice(2);
    const sourceFiles = await resolveTargetJsFiles(
      sourceDir,
      targetArgs,
      options,
    );

    if (sourceFiles.length === 0) {
      throw new Error(`No source files were found in ${sourceDir}`);
    }

    const generatedFiles = await Promise.all(sourceFiles.map(generate));
    generatedFiles.forEach((file) => {
      console.info(`Generated: ${file}`);
    });
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
