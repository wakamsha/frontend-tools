#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  importConfigFromTsFile,
  packageRoot,
  resolveJsonOutputPath,
  resolveSchemaPathForJson,
  resolveTargetTsFiles,
  writeJsonForTsFile,
} from './jsonGeneratorShared.ts';

const srcConfigsDir = path.resolve(packageRoot, 'src/configs');
const outputConfigsDir = path.resolve(packageRoot, 'configs');

function isRuleImportPath(importPath: string): boolean {
  return /^\.\.\/(?:.+\/)?rules\/.+\.ts$/.test(importPath);
}

function toRulesJsonPath(importPath: string): string {
  return importPath
    .replace('/rules/', '/rules-json/')
    .replace(/\.ts$/, '.json');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function createRuleExtendsMap(configFilePath: string) {
  const sourceText = await readFile(configFilePath, 'utf8');

  const importMatches = sourceText.matchAll(
    /import\s+[A-Za-z_$][\w$]*\s+from\s+['"](?<source>[^'"]+)['"];/g,
  );

  const ruleImportPaths = [...importMatches]
    .map(([, importPath]) => importPath)
    .filter((importPath) => isRuleImportPath(importPath));

  const mapEntries = await Promise.all(
    ruleImportPaths.map(async (importPath) => {
      const absoluteImportPath = path.resolve(
        path.dirname(configFilePath),
        importPath,
      );
      const importedModule = (await import(
        pathToFileURL(absoluteImportPath).href
      )) as { default?: unknown };
      const importedConfig = importedModule.default;

      if (!isRecord(importedConfig)) {
        throw new TypeError(
          `Default export is not a config object: ${absoluteImportPath}`,
        );
      }

      return [importedConfig, toRulesJsonPath(importPath)] as const;
    }),
  );

  return new Map<unknown, string>(mapEntries);
}

function normalizeExtends(
  extendsValue: unknown,
  extendsMap: Map<unknown, string>,
  configFilePath: string,
): unknown {
  if (!Array.isArray(extendsValue)) {
    return extendsValue;
  }

  return extendsValue.map((entry) => {
    if (typeof entry === 'string') {
      return entry;
    }

    const mappedPath = extendsMap.get(entry);

    if (mappedPath === undefined) {
      throw new Error(
        `Unable to map extends entry to JSON path in ${path.relative(packageRoot, configFilePath)}`,
      );
    }

    return mappedPath;
  });
}

async function generateConfigJsonFile(configFilePath: string) {
  const config = await importConfigFromTsFile(configFilePath);
  const extendsMap = await createRuleExtendsMap(configFilePath);
  const outputPath = resolveJsonOutputPath(
    configFilePath,
    outputConfigsDir,
    srcConfigsDir,
  );
  const output: Record<string, unknown> = {
    $schema: resolveSchemaPathForJson(outputPath),
    ...config,
  };

  if ('extends' in config) {
    output.extends = normalizeExtends(
      config.extends,
      extendsMap,
      configFilePath,
    );
  }

  return writeJsonForTsFile(
    configFilePath,
    outputConfigsDir,
    output,
    srcConfigsDir,
  );
}

async function main() {
  const targetArgs = process.argv.slice(2);
  const configFiles = await resolveTargetTsFiles(srcConfigsDir, targetArgs, {
    excludeBaseNames: ['index'],
    recursive: true,
  });

  if (configFiles.length === 0) {
    throw new Error(`No config files were found in ${srcConfigsDir}`);
  }

  const generatedFiles = await Promise.all(
    configFiles.map(generateConfigJsonFile),
  );
  generatedFiles.forEach((file) => {
    console.info(`Generated: ${file}`);
  });
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
