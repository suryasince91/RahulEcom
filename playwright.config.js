/**
 * @see https://playwright.dev/docs/test-configuration
 */
const { devices } = require('@playwright/test');

const config = ({
  testDir: './tests',
  timeout: 50000,
  expect: {
    timeout: 50000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    // default desktop project
    {
      name: 'desktop',
    },
   
    
  ],
});

module.exports = config;