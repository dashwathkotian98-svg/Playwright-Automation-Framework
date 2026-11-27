# Playwright Automation Framework

JavaScript end-to-end tests for the Rahul Shetty Academy Automation Practice page, built with Playwright Test and the Page Object Model. The suite uses the application's observed controls and runs in Chromium.

## Setup

```bash
npm ci
npx playwright install chromium
```

## Run tests

```bash
npm test
```

Playwright runs headless by default. To run with a visible Chromium window:

```bash
npm run test:headed
```

Run the Chromium project explicitly:

```bash
npm run test:chromium
```

The suite contains 10 independent end-to-end tests. Each navigates to the practice page in `beforeEach`; `afterEach` closes any child pages opened by the test.

## Smoke and regression execution

The core radio, autocomplete, dropdown, and checkbox tests are tagged `@smoke`. All 10 tests are tagged `@regression`.

```bash
npm run test:smoke
npm run test:regression
```

## Reports and failure artifacts

The HTML report is generated at `reports/html-report`:

```bash
npm run test:report
```

Screenshots and traces are captured on test failure under `reports/test-results`.

## Project layout

- `tests/` — Playwright Test specs and test hooks
- `pages/` — Page Object and observed application locators
- `Test-Data/` — Reusable test inputs
- `utils/` — Browser lifecycle helpers
- `reports/` — HTML report and test result output
