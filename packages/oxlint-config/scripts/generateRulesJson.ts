#!/usr/bin/env node

import path from 'node:path';
import {
  importConfigFromTsFile,
  packageRoot,
  resolveJsonOutputPath,
  resolveSchemaPathForJson,
  resolveTargetTsFiles,
  writeJsonForTsFile,
} from './jsonGeneratorShared.ts';

const srcRulesDir = path.resolve(packageRoot, 'src/rules');
const outputDir = path.resolve(packageRoot, 'rules-json');

async function generateJsonFile(ruleFilePath: string) {
  const config = await importConfigFromTsFile(ruleFilePath);
  const outputPath = resolveJsonOutputPath(ruleFilePath, outputDir);

  return writeJsonForTsFile(ruleFilePath, outputDir, {
    $schema: resolveSchemaPathForJson(outputPath),
    ...config,
  });
}

async function main() {
  const targetArgs = process.argv.slice(2);
  const ruleFiles = await resolveTargetTsFiles(srcRulesDir, targetArgs);

  if (ruleFiles.length === 0) {
    throw new Error(`No rule files were found in ${srcRulesDir}`);
  }

  const generatedFiles = await Promise.all(ruleFiles.map(generateJsonFile));
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
