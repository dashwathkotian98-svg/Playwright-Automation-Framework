
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    // Store screenshots, traces and test artifacts
    outputDir: './reports/test-results',

    // Parallel execution
    fullyParallel: true,

    // Fail build if test.only is accidentally committed
    forbidOnly: !!process.env.CI,

    // Retry failed tests in Jenkins
    retries: process.env.CI ? 2 : 0,

    // Configure workers
    workers: process.env.CI ? 2 : undefined,

    // Test timeout
    timeout: 30000,

    expect: {
        timeout: 5000
    },

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'reports/html-report',
            open: 'never'
        }],
        ['allure-playwright', {
            resultsDir: 'allure-results'
        }]
    ],

    use: {
        baseURL: 'https://rahulshettyacademy.com',
        browserName: 'chromium',

        headless: !!process.env.CI,

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure',

        video: 'retain-on-failure',

        actionTimeout: 10000
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]

});
