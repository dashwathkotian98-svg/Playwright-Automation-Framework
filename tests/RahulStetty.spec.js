const { test, expect } = require('@playwright/test');
const PracticePage = require('../pages/PracticePage');
const testData = require('../Test-Data/automation-practice.json');
const { closeChildPages } = require('../utils/browser');

test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
});

test.afterEach(async ({ page }) => {
    await closeChildPages(page);
});

test('selects the second radio button @smoke @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await expect(page).toHaveTitle('Practice Page');
    await practicePage.selectRadio(1);

    await expect(practicePage.radioButtons.nth(1)).toBeChecked();
});

test('searches for and selects India in the country autocomplete @smoke @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.selectCountry(testData.countrySearch, testData.country);

    await expect(practicePage.autocompleteInput).toHaveValue(testData.country);
    await expect(practicePage.countrySuggestion(testData.country)).toBeHidden();
});

test('selects the second dropdown option @smoke @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.selectDropdownOption(testData.dropdownOption);

    await expect(practicePage.dropdown).toHaveValue(testData.dropdownOption);
});

test('checks the first and third checkboxes @smoke @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.checkCheckbox(0);
    await practicePage.checkCheckbox(2);

    await expect(practicePage.checkboxes.nth(0)).toBeChecked();
    await expect(practicePage.checkboxes.nth(2)).toBeChecked();
    await expect(practicePage.checkboxes.nth(1)).not.toBeChecked();
});

test('hides and shows the displayed text field @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.displayedText.fill(testData.displayedText);
    await practicePage.hideDisplayedText();
    await expect(practicePage.displayedText).toBeHidden();

    await practicePage.showDisplayedText();
    await expect(practicePage.displayedText).toBeVisible();
    await expect(practicePage.displayedText).toHaveValue(testData.displayedText);
});

test('shows the entered name in the alert dialog @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.nameInput.fill(testData.name);
    await expect(practicePage.nameInput).toHaveValue(testData.name);

    const dialogPromise = page.waitForEvent('dialog').then(async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain(testData.name);
        await dialog.accept();
    });
    await practicePage.openAlert();
    await dialogPromise;
    await expect(practicePage.nameInput).toHaveValue('');
});

test('accepts the confirmation dialog and clears the name field @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.nameInput.fill(testData.name);

    const dialogPromise = page.waitForEvent('dialog').then(async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe(`Hello ${testData.name}, Are you sure you want to confirm?`);
        await dialog.accept();
    });
    await practicePage.openConfirm();
    await dialogPromise;
    await expect(practicePage.nameInput).toHaveValue('');
});

test('opens the Open Window destination in a new page @regression', async ({ page }) => {
    const popup = await new PracticePage(page).openWindow();

    await expect(popup).toHaveURL(/qaclickacademy\.com/i);
});

test('opens the Open Tab link in a new page @regression', async ({ page }) => {
    const popup = await new PracticePage(page).openTab();

    await expect(popup).toHaveURL(/qaclickacademy\.com/i);
});

test('reveals and follows the Top link on mouse hover @regression', async ({ page }) => {
    const practicePage = new PracticePage(page);

    await practicePage.hoverMenu();
    await expect(practicePage.hoverMenuLink('Top')).toBeVisible();
    await practicePage.hoverMenuLink('Top').click();

    await expect(page).toHaveURL(/#top$/);
});

