/**
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
