export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
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
