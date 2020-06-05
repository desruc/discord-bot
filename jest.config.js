module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  }
};
