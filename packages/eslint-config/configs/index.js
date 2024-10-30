// @ts-check
import testEssentials from './test/essentials.js';
import testReact from './test/react.js';

const test = {
  essentials: testEssentials,
  react: testReact,
};

export { default as essentials } from './essentials.js';
export { default as jsdoc } from './jsdoc.js';
export { default as node } from './node.js';
export { default as react } from './react.js';
export { default as storybook } from './storybook.js';
export { default as typescript } from './typescript.js';
export { test };
