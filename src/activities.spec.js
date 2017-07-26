require('jasmine-ajax');

describe("The zipline", function () {
  var camper, zipline;

  beforeEach(() => {
    camper = require('./people.js').default().nia;
    zipline = require('./activities.js').default().zipline;
  });

  it("allows riders who are at least 16 yrs old", function (done) {
    camper.age = 16;

    camper.doActivity(zipline)
      .then(done)
      .catch(() => done.fail("Zipline Do function failed"));
  });

  it("allows riders under 16 with a waiver", function (done) {
    camper.age = 15;
    camper.waivers = { zipline: true };

    camper.doActivity(zipline)
      .then(done)
      .catch(() => done.fail("Do failed"));
  });

  it("does not allow riders under 16 without a waiver", function (done) {
    camper.age = 15;
    camper.waivers = {};

    camper.doActivity(zipline)
      .then(() => done.fail("Zipline do succeeded when it should have failed"))
      .catch(done);
  });
});

describe("The pool", function () {
  var camper, pool, mockTime;

  beforeAll(function () {
    mockTime = new Date();
  });

  beforeEach(() => {
    camper = require('./people.js').default().nia;
    pool = require('./activities.js').default().pool;
  });

  it("allows swimmers between 7am and 7pm", function (done) {
    mockTime.setHours(7, 0, 0, 0);
    jasmine.clock().mockDate(mockTime);

    camper.doActivity(pool)
      .catch(() => done.fail("Do failed"))
      .then(() => {
        mockTime.setHours(18, 59, 0, 0);
        jasmine.clock().mockDate(mockTime);
        return camper;
      })
      .then(c => c.doActivity(pool))
      .then(done)
      .catch(() => done.fail("Do failed"));
  });

  it("does not allow swimmers earlier than 7am", function (done) {
    mockTime.setHours(6, 59, 0, 0);
    jasmine.clock().mockDate(mockTime);

    camper.doActivity(pool)
      .then(() => done.fail("Pool do function succeeded when it should have failed"))
      .catch(done);
  });

  it("does not allow swimmers later than 7pm", function (done) {
    mockTime.setHours(19, 0, 0, 0);
    jasmine.clock().mockDate(mockTime);

    camper.doActivity(pool)
      .then(() => done.fail("Do succeeded"))
      .catch(done);
  });
});

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
