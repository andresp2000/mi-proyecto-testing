/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
// @ts-nocheck

module.exports = {
  mutate: ["algorithms/binary-search.ts"],
  testRunner: "jasmine",
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "off",
};