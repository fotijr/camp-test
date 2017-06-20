describe("The zipline", function () {
  it("allows riders who are at least 16 yrs old", function () {
    var rider = { age: 16 };
    var zipline = require('./activities.js').default().zipline;
    var result = zipline.do(rider);
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

  it("does NOT allow riders under 16 without a waiver", function () {
    var rider = {
      age: 15,
      waivers: {}
    };
    var zipline = require('./activities.js').default().zipline;
    var result = zipline.do(rider);
    expect(result.success).toBe(false);
  });
});