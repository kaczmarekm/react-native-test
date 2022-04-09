module.exports = {
  preset: 'react-native-web',
  transformIgnorePatterns: ['/node_modules/(?!native-base)/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/docs/',
    '/android/',
    '/ios/',
    '/public/',
    '/scripts/',
    '/types/',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: ['<rootDir>/src/__tests__', '/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
};
