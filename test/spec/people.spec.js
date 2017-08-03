import people from "../../src/people.js";

describe("A person", function () {
  it("starts at [0,0] if no canvas size supplied in constructor", function () {
    var person = people().all[0];
    expect(person.x).toBe(0);
    expect(person.y).toBe(0);
  });
});