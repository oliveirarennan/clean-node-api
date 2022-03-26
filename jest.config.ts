export default {
  roots: ['<rootDir>/src'],
  // collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
