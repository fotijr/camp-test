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

  it("does NOT allow riders younger than 16 yrs old", function () {
    var rider = { age: 15 };
    var zipline = require('./activities.js').default().zipline;
    var result = zipline.do(rider);
    expect(result.success).toBe(false);
  });
});