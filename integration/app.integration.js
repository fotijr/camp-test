module.exports = {
    "Verify campground is visible": function (browser) {
        browser
            .url("http://localhost:9000")
            .waitForElementVisible("body", 1000)
            .assert.title("Camp Test")
            .assert.visible("canvas")
            .end();
    }
};