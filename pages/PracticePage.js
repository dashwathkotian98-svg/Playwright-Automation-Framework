const selectors = require('./locators.json');

class PracticePage {
    constructor(page) {
        this.page = page;
        this.selectors = selectors;
    }

    get radioButtons() {
        return this.page.locator(this.selectors.radioButtons);
    }

    get autocompleteInput() {
        return this.page.locator(this.selectors.autocomplete);
    }

    get dropdown() {
        return this.page.locator(this.selectors.dropdown);
    }

    get checkboxes() {
        return this.page.locator(this.selectors.checkboxes.join(', '));
    }

    get nameInput() {
        return this.page.locator(this.selectors.name);
    }

    get displayedText() {
        return this.page.locator(this.selectors.displayedText);
    }

    countrySuggestion(country) {
        return this.page
            .locator(this.selectors.autocompleteSuggestions)
            .getByText(country, { exact: true });
    }

    hoverMenuLink(label) {
        return this.page
            .locator(this.selectors.mouseHoverLinks)
            .getByText(label, { exact: true });
    }

    async goto() {
        await this.page.goto(this.selectors.url, { waitUntil: 'domcontentloaded' });
    }

    async selectRadio(index) {
        await this.radioButtons.nth(index).check();
    }

    async selectCountry(query, country) {
        await this.autocompleteInput.fill(query);
        await this.countrySuggestion(country).click();
    }

    async selectDropdownOption(value) {
        await this.dropdown.selectOption(value);
    }

    async checkCheckbox(index) {
        await this.checkboxes.nth(index).check();
    }

    async hideDisplayedText() {
        await this.page.locator(this.selectors.hideButton).click();
    }

    async showDisplayedText() {
        await this.page.locator(this.selectors.showButton).click();
    }

    async openAlert() {
        await this.page.locator(this.selectors.alertButton).click();
    }

    async openConfirm() {
        await this.page.locator(this.selectors.confirmButton).click();
    }

    async openWindow() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.page.locator(this.selectors.openWindowButton).click();
        return popupPromise;
    }

    async openTab() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.page.locator(this.selectors.openTabLink).click();
        return popupPromise;
    }

    async hoverMenu() {
        await this.page.locator(this.selectors.mouseHoverButton).hover();
    }
}

module.exports = PracticePage;
