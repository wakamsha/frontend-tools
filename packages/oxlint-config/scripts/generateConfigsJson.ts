#!/usr/bin/env node

import path from 'node:path';
import {
  configsOutputDir,
  importConfigFromTsFile,
  packageRoot,
  resolveJsonOutputPath,
  resolveTargetJsFiles,
  rulesOutputDir,
  runGenerator,
  srcConfigsDir,
  srcRulesDir,
  writeJsonFile,
} from './jsonGeneratorShared.ts';

/**
 * Maps each rule-set's default export to the absolute path of its generated
 * JSON preset.
 *
 * ESM module caching guarantees that the rule-set objects referenced in a
 * config's `extends` array are the same instances imported here, so the map
 * can be keyed by object identity.
 */
async function buildRuleSetOutputMap(): Promise<Map<unknown, string>> {
  const ruleFiles = await resolveTargetJsFiles(srcRulesDir, []);
  const entries = await Promise.all(
    ruleFiles.map(async (ruleFilePath) => {
      const ruleSet = await importConfigFromTsFile(ruleFilePath);
      const outputPath = resolveJsonOutputPath(ruleFilePath, rulesOutputDir);

      return [ruleSet, outputPath] as const;
    }),
  );

  return new Map(entries);
}

/**
 * Rewrites a config's `extends` entries: string entries pass through, while
 * rule-set objects are replaced with the relative path to their generated JSON
 * preset.
 */
function normalizeExtends(
  extendsValue: unknown,
  ruleSetOutputMap: Map<unknown, string>,
  configOutputPath: string,
): unknown {
  if (!Array.isArray(extendsValue)) {
    return extendsValue;
  }

  return extendsValue.map((entry) => {
    if (typeof entry === 'string') {
      return entry;
    }

    const ruleOutputPath = ruleSetOutputMap.get(entry);

    if (ruleOutputPath === undefined) {
      throw new Error(
        `Unable to map an extends entry to a generated rule preset in ${path.relative(packageRoot, configOutputPath)}`,
      );
    }

    return path.relative(path.dirname(configOutputPath), ruleOutputPath);
  });
}

const ruleSetOutputMap = await buildRuleSetOutputMap();

await runGenerator(
  srcConfigsDir,
  async (configFilePath) => {
    const config = await importConfigFromTsFile(configFilePath);
    const outputPath = resolveJsonOutputPath(
      configFilePath,
      configsOutputDir,
      srcConfigsDir,
    );
    const normalizedConfig =
      'extends' in config
        ? {
            ...config,
            extends: normalizeExtends(
              config.extends,
              ruleSetOutputMap,
              outputPath,
            ),
          }
        : config;

    return writeJsonFile(outputPath, normalizedConfig);
  },
  {
    excludeBaseNames: ['index'],
    recursive: true,
  },
);
