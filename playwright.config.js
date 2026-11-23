
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    fullyParallel: false,

    retries: 0,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: 'https://rahulshettyacademy.com',
        headless: false,
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


