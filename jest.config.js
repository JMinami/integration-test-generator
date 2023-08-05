/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["tests"],
  "transform": {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  }
};