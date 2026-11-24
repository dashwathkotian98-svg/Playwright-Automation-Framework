
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    fullyParallel: false,

    retries: process.env.CI ? 2 : 0,

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never'
        }]
    ],

    use: {
        baseURL: 'https://rahulshettyacademy.com',
        headless: !!process.env.CI,
        viewport: null,

        launchOptions: {
            args: ['--start-maximized']
        },

        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
    },

    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] }
        }
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // },
        // {
        //     name: 'WebKit',
        //     use: { ...devices['Desktop Safari'] }
        // }
    ]

});


