export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  collectCoverageFrom: ['src/**/*.js', '!src/entities/base/*.js'],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: '50%',
  testEnvironment: 'jest-environment-node',
  watchPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules'],
  preset: '@shelf/jest-mongodb',
}
