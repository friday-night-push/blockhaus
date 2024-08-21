import dotenv from 'dotenv';
import type { Config } from 'jest';

dotenv.config();

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    'ts-jest': {
      isolatedModules: true,
    },
  },
  maxWorkers: 1,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
    'src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
