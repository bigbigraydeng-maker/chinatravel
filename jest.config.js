const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Setup files to run after the test framework is installed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Use jsdom environment for React component testing
  testEnvironment: 'jest-environment-jsdom',

  // Handle module aliases matching tsconfig paths (@/* -> src/*)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handle CSS modules
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle static assets
    '\\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Transform TypeScript and JSX files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // Collect coverage from these file patterns
  collectCoverageFrom: [
    'src/components/tools/**/*.{tsx,ts}',
    'src/components/blog/**/*.{tsx,ts}',
    'src/lib/tools/**/*.ts',
    'src/lib/blog-staging/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/__tests__/**',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Coverage output directory
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'json-summary'],

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Verbose output for better debugging
  verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
