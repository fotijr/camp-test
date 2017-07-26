require('jasmine-ajax');

describe("Using the computer lab", function () {
  var camper, computerLab;

  beforeEach(function () {
    jasmine.Ajax.install();
    camper = zipline = require('./people.js').default().nia;
    computerLab = require('./activities.js').default().computerLab;
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  describe("to check for emailed waivers", function () {

    it("will call the waiver API and add waiver to camper", function (done) {
      spyOn(camper, "addWaiver");

      camper.doActivity(computerLab)
        .then(() => {
          expect(jasmine.Ajax.requests.mostRecent().url).toBe("api/waiver.json");
          expect(camper.addWaiver).toHaveBeenCalled();
          done();
        })
        .catch(() => done.fail("Error fetching waivers"));

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": "application/json",
        "responseText": '{"signed": true}'
      });
    });

    it("will fail if the waiver is not signed", function (done) {
      camper.waivers = {};

      camper.doActivity(computerLab)
        .then(() => { done.fail("Activity should have failed") })
        .catch(errorMsg => {
          expect(errorMsg).toContain("signed");
          done();
        });

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": "application/json",
        "responseText": '{}'
      });
    });
  });
});
