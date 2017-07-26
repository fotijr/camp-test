describe('Campground', function () {
    it('is visible', function () {
        browser.url("/");
        expect(browser.isVisible("canvas")).toBe(true);
    });
});