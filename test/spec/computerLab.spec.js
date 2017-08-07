require("jasmine-ajax");

import people from "../../src/people.js";
import activities from "../../src/activities.js";

describe("Using the computer lab", function () {
  var camper, computerLab,
    successfulResponse = {
      "status": 200,
      "contentType": "application/json",
      "responseText": '{"signed": true}'
    };

  beforeEach(function () {
    jasmine.Ajax.install();
    camper = people().nia;
    computerLab = activities().computerLab;
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  describe("to check for emailed waivers", function () {

    it("will call addWaiver() when successful", function (done) {
      spyOn(camper, "addWaiver");

      camper.doActivity(computerLab)
        .then(() => {
          expect(camper.addWaiver).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it("will call the waiver API and add waiver to camper", function (done) {
      camper.doActivity(computerLab)
        .then(() => {
          expect(jasmine.Ajax.requests.mostRecent().url).toBe("api/waiver.json");
          done();
        })
        .catch(done.fail);

      jasmine.Ajax.requests.mostRecent().respondWith(successfulResponse);
    });

    it("will fail if the waiver is not signed", function (done) {
      camper.waivers = {};

      camper.doActivity(computerLab)
        .then(() => { done.fail("Activity should have failed"); })
        .catch(errorMsg => {
          expect(errorMsg).toContain("signed");
          done();
        });

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": "application/json",
        "responseText": "{}"
      });
    });
  });
});