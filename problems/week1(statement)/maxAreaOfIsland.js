// 1. 프로그래밍의 구조를 쉽게 파악할 수 있도록 변경하라.
// 2. 기능을 추가하기 쉬운 구조로 변경하라.

module.exports = function maxAreaOfIsland(grid) {
  let result = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 1) {
        const number1OfIsland = countNumber1(grid, x, y);
        result = Math.max(result, number1OfIsland);
      }
    }
  }

  function countNumber1(grid, x, y) {
    grid[y][x] = 0;

    let count = 1;
    const queue = [[x, y]];

    while (queue.length) {
      const [currentX, currentY] = queue.shift();

      for (const [directionX, directionY] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        if (
          grid[currentY + directionY]?.[currentX + directionX] === undefined ||
          grid[currentY + directionY][currentX + directionX] === 0
        )
          continue;

        queue.push([currentX + directionX, currentY + directionY]);
        grid[currentY + directionY][currentX + directionX] = 0;
        count++;
      }
    }

    return count;
  }
  return result;
};
