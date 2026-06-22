/**
 * @typedef {Object} OxlintConfigObject
 */

/**
 * @typedef {Object} TestConfigs
 * @property {OxlintConfigObject} essentials
 */

import testEssentials from '../src/configs/test/essentials.js';

/**
 * @type {TestConfigs}
 */
const test = {
  essentials: testEssentials,
};

export { default as essentials } from '../src/configs/essentials.js';
export { default as jsdoc } from '../src/configs/jsdoc.js';
export { default as nextjs } from '../src/configs/nextjs.js';
export { default as node } from '../src/configs/node.js';
export { default as react } from '../src/configs/react.js';
export { default as typescript } from '../src/configs/typescript.js';
export { test };
