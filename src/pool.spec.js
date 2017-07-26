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