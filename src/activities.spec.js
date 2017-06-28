describe("The zipline", function () {
  it("allows riders who are at least 16 yrs old", function () {
    var rider = { age: 16 },
      zipline = require('./activities.js').default().zipline,
      result;

    result = zipline.do(rider);
    expect(result.success).toBe(true);

    rider.age = 99;
    result = zipline.do(rider);
    expect(result.success).toBe(true);
  });

  it("allows riders under 16 with a waiver", function () {
    var rider = {
      age: 15,
      waivers: {
        zipline: true
      }
    };
    var zipline = require('./activities.js').default().zipline;
    var result = zipline.do(rider);
    expect(result.success).toBe(true);
  });

  it("does not allow riders under 16 without a waiver", function () {
    var rider = {
      age: 15,
      waivers: {}
    };
    var zipline = require('./activities.js').default().zipline;
    var result = zipline.do(rider);
    expect(result.success).toBe(false);
  });
});

describe("The pool", function () {
  it("allows swimmers between 7am and 7pm", function () {
    var swimmer = { age: 16 },
      pool = require('./activities.js').default().pool,
      mockTime = new Date(),
      result;

    mockTime.setHours(7, 0, 0, 0);
    jasmine.clock().mockDate(mockTime);
    result = pool.do(swimmer);
    expect(result.success).toBe(true);

    mockTime.setHours(18, 59, 0, 0);
    jasmine.clock().mockDate(mockTime);
    result = pool.do(swimmer);
    expect(result.success).toBe(true);
  });

  it("does not allow swimmers earlier than 7am or later than 7pm", function () {
    var swimmer = { age: 16 },
      pool = require('./activities.js').default().pool,
      mockTime = new Date(),
      result;

    mockTime.setHours(6, 59, 0, 0);
    jasmine.clock().mockDate(mockTime);
    result = pool.do(swimmer);
    expect(result.success).toBe(false);

    mockTime.setHours(19, 0, 0, 0);
    jasmine.clock().mockDate(mockTime);
    result = pool.do(swimmer);
    expect(result.success).toBe(false);
  });
});