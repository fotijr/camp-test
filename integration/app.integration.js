const sauceLabReporter = require('./sauce-lab-reporter');

module.exports = {
    "Verify campground is visible": function (browser) {
        browser
            .url("http://localhost:9000")
            .waitForElementVisible("body", 1000)
            .assert.title("Camp Test")
            .assert.visible("canvas")
            .end();
    },

    "Welcome message disappears after user moves camper": function (browser) {
        browser
            .url("http://localhost:9000")
            .waitForElementVisible("canvas", 1000);

        browser.expect.element('div.prompt').to.be.visible;
        browser.keys(browser.Keys.DOWN_ARROW);
        browser.expect.element('div.prompt').to.not.be.visible;
        browser.end();
    },

    tearDown: sauceLabReporter
};