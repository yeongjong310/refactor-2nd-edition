module.exports = function maxAreaOfIsland(grid) {
  let result = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 1) {
        result = Math.max(result, countNumber1(x, y)); // 변수 제거 및 인라인 처리
      }
    }
  }

  function countNumber1(x, y) {
    // 함수 선언 바꾸기
    memo(x, y);

    let result = 1; // 명확한 이름으로 변경
    const queue = [[x, y]];

    while (queue.length) {
      const [currentX, currentY] = queue.shift();

      for (const [directionX, directionY] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        if (isPassTheCell(currentX + directionX, currentY + directionY))
          continue;

        queue.push([currentX + directionX, currentY + directionY]);
        memo(currentX + directionX, currentY + directionY);
        result++;
      }
    }

    return result;
  }

  // 함수 추출
  function isPassTheCell(x, y) {
    return grid[y]?.[x] === undefined || grid[y]?.[x] === 0;
  }

  // 함수 추출
  function memo(x, y) {
    grid[y][x] = 0;
  }

  return result;
};
