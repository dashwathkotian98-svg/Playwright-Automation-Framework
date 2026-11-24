const { test, expect } = require('@playwright/test');
const locators = require('./locators.json');

const practice = locators.practicePage;

// Test Case 01: Radio button functionality
test('PW_TC_001 - Verify radio button functionality', async ({ page }) => {

    await page.goto(practice.url);

    const radioBtn = page.locator(practice.radio1);

    await radioBtn.click();

    await expect(radioBtn).toBeChecked();

});

// Test Case 02: Hide and Show textbox functionality
test('PW_TC_002 - Verify hide and show textbox functionality', async ({ page }) => {

    await page.goto(practice.url);

    const textBox = page.locator(practice.displayedText);
    const hideBtn = page.locator(practice.hideTextBox);
    const showBtn = page.locator(practice.showTextBox);

    await textBox.fill('show hide element');

    await hideBtn.click();

    await expect(textBox).toBeHidden();

    await showBtn.click();

    await expect(textBox).toBeVisible();

});

// Test Case 03: Checkbox functionality
test('PW_TC_003 - Verify checkbox functionality', async ({ page }) => {

    await page.goto(practice.url);

    const checkbox1 = page.locator(practice.checkbox1);
    const checkbox2 = page.locator(practice.checkbox2);
    const checkbox3 = page.locator(practice.checkbox3);

    console.log('Starting checkbox test');

    await checkbox1.check();
    console.log('Option1 selected:', await checkbox1.isChecked());

    await checkbox2.check();
    console.log('Option2 selected:', await checkbox2.isChecked());

    await checkbox3.check();
    console.log('Option3 selected:', await checkbox3.isChecked());

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
    await expect(checkbox3).toBeChecked();

    console.log('All checkboxes selected successfully');

    // Unselect all checkboxes
    await checkbox1.uncheck();
    await checkbox2.uncheck();
    await checkbox3.uncheck();

    // Verify all are unselected
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).not.toBeChecked();

});

// Test Case 04: Alert functionality
test('PW_TC_004 - Verify alert functionality', async ({ page }) => {

    await page.goto('/AutomationPractice/');

    const nameTextbox = page.locator(practice.name);
    const alertButton = page.locator(practice.alertButton);

    // Enter name
    await nameTextbox.fill('dashwath');

    const dialogPromise = page.waitForEvent('dialog').then(async dialog => {
        expect(dialog.message()).toContain('dashwath');
        await dialog.accept();
    });

    await alertButton.click();
    await dialogPromise;
});

// Test Case 05: Verify new window functionality
test('PW_TC_005 - Verify new window functionality', async ({ page }) => {

    await page.goto(practice.url);

    // Wait for popup and click Open Window
    const [childWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(practice.openWindow).click()
    ]);

    // Wait until popup loads
    await childWindow.waitForLoadState('domcontentloaded');

    console.log('Child Window URL:', childWindow.url());
    console.log('Child Window Title:', await childWindow.title());

    // Verify popup opened
    await expect(childWindow).toHaveURL(/rahulshettyacademy|qaclickacademy/);

    await childWindow.close();

});

// Test Case 06: Verify mouse hover and click Top
test('PW_TC_006 - Verify mouse hover and click Top', async ({ page }) => {

    await page.goto('/AutomationPractice/');

    const ele = page.locator(practice.mouseHover);

    // Scroll to the element
    await ele.scrollIntoViewIfNeeded();

    // Mouse hover
    await ele.hover();

    // Click Top option
    await page.locator(practice.topLink).click();

});

// Test Case 07: Verify autocomplete functionality
test('PW_TC_007 - Verify autocomplete functionality', async ({ page }) => {

    await page.goto('/AutomationPractice/');

    // Enter text in autocomplete textbox
    await page.locator(practice.autocomplete).fill('ind');

    // Wait for and select India from suggestions
    const indiaOption = page.locator(practice.indiaOption);

    await expect(indiaOption).toBeVisible();
    await indiaOption.click();

});

// Test Case 08: Verify dropdown functionality
test('PW_TC_008 - Verify dropdown functionality', async ({ page }) => {

    await page.goto('/AutomationPractice/');

    const dropdown = page.locator(practice.dropdown);

    // Select option by index
    await dropdown.selectOption({ index: 3 });

    // Verify selected option
    await expect(dropdown).toHaveValue('option3');

});

// Test Case 09: Verify Home navigation and Sign Up functionality
test('PW_TC_009 - Verify Home navigation and Sign Up functionality', async ({ page, context }) => {
    test.skip(Boolean(process.env.CI), 'This flow sends a real verification email and is excluded from CI.');

    const signupTestEmail = process.env.SIGNUP_TEST_EMAIL;
    test.skip(!signupTestEmail, 'Set SIGNUP_TEST_EMAIL to a dedicated test address to run this flow.');

    // Step 1: Navigate to Automation Practice page
    await page.goto(practice.url);

    // Step 2: Click Home button
    await page.locator(practice.homeButton).click();

    await page.waitForLoadState('domcontentloaded');

    console.log('Home page URL:', page.url());

    // Step 3: Click Sign Up and capture new tab
    const [signUpPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator(practice.signUpLink).click()
    ]);

    // Step 4: Wait for Sign Up page to load
    await signUpPage.waitForLoadState('domcontentloaded');

    console.log('Sign Up page URL:', signUpPage.url());

    // Step 5: Enter name
    const nameField = signUpPage.locator(locators.signUpPage.name);
    await nameField.fill('dashwath');

    // Step 6: Enter email
    const emailField = signUpPage.locator(locators.signUpPage.email);
    await emailField.fill(signupTestEmail);
    await expect(emailField).toHaveValue(signupTestEmail);

    // Step 7: Select marketing emails checkbox
    const checkbox = signUpPage.locator(locators.signUpPage.marketingEmailsCheckbox);
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Step 8: Click Send Code button
    await signUpPage.locator(locators.signUpPage.sendCodeButton).click();

});

// E2E_001: Radio Button, Dropdown & Checkbox
test('E2E_001 - Verify user can complete form selections', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(practice.url, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/AutomationPractice/);

    const radioButton = page.locator(practice.radio1);
    const dropdown = page.locator(practice.dropdown);
    const checkbox1 = page.locator(practice.checkbox1);
    const checkbox2 = page.locator(practice.checkbox2);

    await radioButton.check();
    await dropdown.selectOption({ label: 'Option2' });
    await checkbox1.check();
    await checkbox2.check();

    await expect(radioButton).toBeChecked();
    await expect(dropdown).toHaveValue('option2');
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
});

// E2E_002: Text Input & JavaScript Alert
test('E2E_002 - Verify entered name is displayed in the JavaScript alert', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(practice.url, { waitUntil: 'domcontentloaded' });

    const name = 'Dashwath';
    const nameTextbox = page.locator(practice.name);
    const alertButton = page.locator(practice.alertButton);

    await nameTextbox.fill(name);
    await expect(nameTextbox).toHaveValue(name);

    const dialogPromise = page.waitForEvent('dialog').then(async dialog => {
        expect(dialog.message()).toContain(name);
        await dialog.accept();
    });

    await alertButton.click();
    await dialogPromise;

    await expect(nameTextbox).toBeVisible();
});

// E2E_003: Textbox Hide & Show
test('E2E_003 - Verify user can hide and show the text input field', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(practice.url, { waitUntil: 'domcontentloaded' });

    const textBox = page.locator(practice.displayedText);
    const hideButton = page.locator(practice.hideTextBox);
    const showButton = page.locator(practice.showTextBox);

    await expect(textBox).toBeVisible();
    await hideButton.click();
    await expect(textBox).toBeHidden();
    await showButton.click();
    await expect(textBox).toBeVisible();
});


