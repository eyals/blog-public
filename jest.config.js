module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/scripts/puppeteer-tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/scripts/puppeteer-tests/setup.js'],
  testTimeout: 30000,
};