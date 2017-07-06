require('jasmine-ajax');

describe("The zipline", function () {
  it("allows riders who are at least 16 yrs old", function (done) {
    var rider = { age: 16 },
      zipline = require('./activities.js').default().zipline;

    zipline.do(rider)
      .then(done)
      .catch(() => done.fail("Do failed"));

    rider.age = 99;
    zipline.do(rider)
      .then(done)
      .catch(() => done.fail("Do failed"));
  });

  it("allows riders under 16 with a waiver", function (done) {
    var rider = {
      age: 15,
      waivers: { zipline: true }
    };
    var zipline = require('./activities.js').default().zipline;
    zipline.do(rider)
      .then(done)
      .catch(() => done.fail("Do failed"));
  });

  it("does not allow riders under 16 without a waiver", function (done) {
    var rider = {
      age: 15,
      waivers: {}
    };
    var zipline = require('./activities.js').default().zipline;
    zipline.do(rider)
      .then(() => done.fail("Do succeeded"))
      .catch(done);
  });
});

describe("The pool", function () {
  it("allows swimmers between 7am and 7pm", function (done) {
    var swimmer = { age: 16 },
      pool = require('./activities.js').default().pool,
      mockTime = new Date();

    mockTime.setHours(7, 0, 0, 0);
    jasmine.clock().mockDate(mockTime);
    pool.do(swimmer)
      .then()
      .catch(() => done.fail("Do failed"))
      .then(() => {
        mockTime.setHours(18, 59, 0, 0);
        jasmine.clock().mockDate(mockTime);
        return swimmer;
      })
      .then(pool.do)
      .then(done)
      .catch(() => done.fail("Do failed"));
  });

  it("does not allow swimmers earlier than 7am", function (done) {
    var swimmer = { age: 16 },
      pool = require('./activities.js').default().pool,
      mockTime = new Date();

    mockTime.setHours(6, 59, 0, 0);
    jasmine.clock().mockDate(mockTime);
    pool.do(swimmer)
      .then(() => done.fail("Do succeeded"))
      .catch(done);
  });

  it("does not allow swimmers later than 7pm", function (done) {
    var swimmer = { age: 16 },
      pool = require('./activities.js').default().pool,
      mockTime = new Date();

    mockTime.setHours(19, 0, 0, 0);
    jasmine.clock().mockDate(mockTime);
    pool.do(swimmer)
      .then(() => done.fail("Do succeeded"))
      .catch(done);
  });
});

describe("Using the computer lab", function () {
  beforeEach(function () {
    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  describe("to check for emailed waivers", function () {

    it("will call the waiver API", function (done) {
      var camper = { waivers: {} },
        computerLab = require('./activities.js').default().computerLab;

      computerLab.do(camper)
        .then(() => {
          expect(jasmine.Ajax.requests.mostRecent().url).toBe("/api/waiver.json");
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
      var camper = { waivers: {} },
        computerLab = require('./activities.js').default().computerLab;

      computerLab.do(camper)
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
