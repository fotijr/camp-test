describe('Welcome message', function () {
    it('disappears after camper moves', function () {
        browser.url("/");
        expect(browser.isVisible("div.prompt")).toBe(true);
        browser.keys("\uE015"); // down arrow key
        expect(browser.isVisible("div.prompt")).toBe(false);
    });
});