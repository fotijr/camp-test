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
    camper.waivers = { zipline: false };

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
