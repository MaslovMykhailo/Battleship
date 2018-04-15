export function canMoveShip(shipState, matrix) {
  const {x, y, type, pos} = shipState;
  
  if (x < 0 || x > 9 || y < 0 || y > 9) return false;
  
  if (pos) {
    if (x + type - 1 > 9) return false;
  } else {
    if (y + type - 1 > 9) return false;
  }
  
  for (let i = 0 ; i < type ; i++) {
    if (pos) {
      if (matrix[y][x + i]) return false;
    } else {
      if (matrix[y + i][x]) return false;
    }
  }
  return true;
}

export function canMoveHelper(shipState) {
  const {x, y, type, pos} = shipState;
  
  let shiftX = pos ? x+type-1 : x;
  let shiftY = pos ? y : y+type-1;
  
  return x > -1 && shiftX < 10 && y > -1 && shiftY < 10;
}