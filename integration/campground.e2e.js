describe('Campground', function () {
    it('is visible', function () {
        browser.url("http://fotijr.com/camp-test");
        expect(browser.isVisible("canvas")).toBe(true);
    });
});