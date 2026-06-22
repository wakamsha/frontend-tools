#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const packageRoot = path.resolve(dirname, '..');
const configsDir = path.resolve(packageRoot, 'configs');

/**
 * Generate index.d.ts from index.js exports
 */
async function generateIndexDts(): Promise<void> {
  const dtsContent = `/**
 * Configuration exports for @wakamsha/oxlint-config
 */

type OxlintConfig = Record<string, unknown>;

/**
 * Essentials configuration
 */
export const essentials: OxlintConfig;

/**
 * JSDoc rules configuration
 */
export const jsdoc: OxlintConfig;

/**
 * Next.js configuration
 */
export const nextjs: OxlintConfig;

/**
 * Node.js configuration
 */
export const node: OxlintConfig;

/**
 * React configuration
 */
export const react: OxlintConfig;

/**
 * TypeScript configuration
 */
export const typescript: OxlintConfig;

/**
 * Test configurations
 */
export const test: {
  essentials: OxlintConfig;
};
`;

  const dtsPath = path.resolve(configsDir, 'index.d.ts');
  await fs.writeFile(dtsPath, dtsContent, 'utf8');
  console.info(`Generated ${dtsPath}`);
}

await generateIndexDts();
