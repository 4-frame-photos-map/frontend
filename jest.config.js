const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@apis/(.*)$': '<rootDir>/src/apis/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@config$': '<rootDir>/config.ts',
    '^@recoil/(.*)$': '<rootDir>/src/recoil/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'mjs',
    'cjs',
    'jsx',
    'json',
    'node',
  ],
};

module.exports = createJestConfig(customJestConfig);
