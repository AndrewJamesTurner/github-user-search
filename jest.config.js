module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverageFrom: ['src/ts/*.ts'],
  "reporters": [
    "default", 
    ["jest-junit", {outputDirectory: "test-reports"}],
  ]
}
