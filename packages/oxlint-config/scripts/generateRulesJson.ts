#!/usr/bin/env node

import {
  importConfigFromTsFile,
  resolveJsonOutputPath,
  rulesOutputDir,
  runGenerator,
  srcRulesDir,
  writeJsonFile,
} from './jsonGeneratorShared.ts';

await runGenerator(srcRulesDir, async (ruleFilePath) => {
  const config = await importConfigFromTsFile(ruleFilePath);
  const outputPath = resolveJsonOutputPath(ruleFilePath, rulesOutputDir);

  return writeJsonFile(outputPath, config);
});
