const maxAreaOfIsland = require("./maxAreaOfIsland");

describe("maxAreaOfIsland test", () => {
  test("maxAreaOfIsland([[0,0,1,0,0,0],[0,0,0,0,0,0],[0,1,1,0,1,0],[0,1,0,0,1,1],[0,1,0,0,1,1]]) => 5", () => {
    expect(
      maxAreaOfIsland([
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 1],
        [0, 1, 0, 0, 1, 1],
      ])
    ).toBe(5);
  });
});
