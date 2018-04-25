'use strict';

module.exports = {
  validateMatrix(matrix) {
    const hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : matrix[row][col];
    let ships = [10, 0, 0, 0, 0];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (hit(row, col)) {
          if (hit(row - 1, col - 1) || hit(row - 1, col + 1)) return false;
          if (hit(row - 1, col) && hit(row, col - 1)) return false;
          if ((matrix[row][col] += hit(row - 1, col) + hit(row, col - 1)) > 4) return false;
          ships[matrix[row][col]]++;
          ships[matrix[row][col] - 1]--;
        }
      }
    }
    return [0, 4, 3, 2, 1].every((s, i) => s === ships[i]);
  },
  progressHandler(x, y, player, enemy) {
    let { enemyMatrix: playerMatrix } = player;
    let { matrix: enemyMatrix, countOfShips } = enemy;
    
    if (!enemyMatrix[y][x]) {
      enemyMatrix[y][x] = 2;
      playerMatrix[y][x] = 2;
      return 'miss';
    } else {
      enemyMatrix[y][x] = 4;
      playerMatrix[y][x] = 3;
      if (shipIsDestroyed(x, y, enemyMatrix, x, y)) {
        destroyHandler(x, y, playerMatrix, enemyMatrix);
        if(!--countOfShips) return 'victory';
      }
      return 'hit';
    }
  }
};

const shipIsDestroyed = (x, y, matrix, prevX, prevY) => {
  if ((x-1 !== prevX || y !== prevY) && x-1 > -1) {
    if (matrix[y][x-1] === 1) return false;
    if (matrix[y][x-1] === 4 && !shipIsDestroyed(x-1, y, matrix, x, y)) return false;
  }
  if ((x+1 !== prevX || y !== prevY) && x+1 < 10) {
    if (matrix[y][x+1] === 1) return false;
    if (matrix[y][x+1] === 4 && !shipIsDestroyed(x+1, y, matrix, x, y)) return false;
  }
  if ((y-1 !== prevY || x !== prevX) && y-1 > -1) {
    if (matrix[y-1][x] === 1) return false;
    if (matrix[y-1][x] === 4 && !shipIsDestroyed(x, y-1, matrix, x, y)) return false;
  }
  if ((y+1 !== prevY || x !== prevX) && y+1 < 10) {
    if (matrix[y+1][x] === 1) return false;
    if (matrix[y+1][x] === 4 && !shipIsDestroyed(x, y+1, matrix, x, y)) return false;
  }
  return true;
};

const destroyHandler = (x, y, playerM, enemyM) => {
  let i;
  
  const changeOnX1 = (x, y, playerM, enemyM) => {
    playerM[y][x] = 4;
    if (y - 1 > -1) {
      playerM[y-1][x] = enemyM[y-1][x] = enemyM[y-1][x] === 4 ? 4 : 2;
    }
    if (y + 1 < 10) {
      playerM[y+1][x] = enemyM[y+1][x] = enemyM[y+1][x] === 4 ? 4 : 2;
    }
  };
  
  const changeOnX2 = (x, y, playerM, enemyM) => {
    for (let j = -1; j < 2; j++) {
      if (y + j > -1 && y + j < 10) playerM[y+j][x] = enemyM[y+j][x] = 2;
    }
  };
  
  const changeOnY1 = (x, y, playerM, enemyM) => {
    playerM[y][x] = 4;
    if (x-1 > -1) {
      playerM[y][x-1] = enemyM[y][x-1] = enemyM[y][x-1] === 4 ? 4 : 2;
    }
    if (x+1 < 10) {
      playerM[y][x+1] = enemyM[y][x+1] = enemyM[y][x+1] === 4 ? 4 : 2;
    }
  };
  
  const changeOnY2 = (x, y, playerM ,enemyM) => {
    for (let j = -1 ; j < 2 ; j++) {
      if (x+j > -1 && x+j < 10) playerM[y][x+j] = enemyM[y][x+j] = 2;
    }
  };
  
  
  if ((x-1 > -1 && enemyM[y][x-1] === 4) || (x+1 < 10 && enemyM[y][x+1] === 4)) {
    i = 0;
    while (x-i > -1 && enemyM[y][x-i] === 4) {
      changeOnX1(x-i, y, playerM ,enemyM);
      i++;
    }
    if (x-i > -1) {
      changeOnX2(x-i, y, playerM, enemyM);
    }
  
    i = 1;
    while (x+i < 10 && enemyM[y][x+i] === 4) {
      changeOnX1(x+i, y, playerM, enemyM);
      i++;
    }
    if (x+i < 10) {
      changeOnX2(x+i, y, playerM, enemyM);
    }
    
  } else {
    i = 0;
    while (y-i > -1 && enemyM[y-i][x] === 4) {
      changeOnY1(x, y-i, playerM, enemyM);
      i++;
    }
    if (y-i > -1) {
      changeOnY2(x, y-i, playerM, enemyM);
    }

    i = 1;
    while (y+i < 10 && enemyM[y+i][x] === 4) {
      changeOnY1(x, y+1, playerM, enemyM);
      i++;
    }
    if (y+i < 10) {
      changeOnY2(x, y+i, playerM, enemyM);
    }
  }
};