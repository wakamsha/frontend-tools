import testEssentials from './test/essentials.ts';

const test = {
  essentials: testEssentials,
};

export { default as essentials } from './essentials.ts';
export { default as jsdoc } from './jsdoc.ts';
export { default as node } from './node.ts';
export { default as react } from './react.ts';
export { default as typescript } from './typescript.ts';
export { test };
