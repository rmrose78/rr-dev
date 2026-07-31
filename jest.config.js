export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    // Pure React bootstrap (createRoot().render()) -- no branch logic.
    '!src/main.tsx',
    // Never executed under test -- moduleNameMapper substitutes
    // env.jest.ts for every import of this module, and its `import.meta`
    // syntax fails Istanbul's standalone instrumentation pass anyway.
    '!src/utils/env.ts',
  ],
  coverageReporters: ['text', 'json-summary'],
  // Set just below the actual achieved numbers (84.51/76/82.41/86.06 as of
  // this writing) -- a small buffer so minor branch-count shifts don't
  // trip it, while still failing CI on a real regression.
  coverageThreshold: {
    global: {
      statements: 84,
      branches: 75,
      functions: 82,
      lines: 86,
    },
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'jest-axe/extend-expect',
    '<rootDir>/src/setupTests.ts',
  ],
  moduleNameMapper: {
    '^@/utils/env$': '<rootDir>/src/utils/env.jest.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(scss|css)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
}
