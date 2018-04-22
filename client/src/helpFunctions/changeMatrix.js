export function changeMatrix(shipState, matrix, action) {
  const {x, y, type, pos} = shipState;
  
  const changeElement = (x, y, whatChange) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) return null;
    const methods = {
      addPoint(x, y) {
        matrix[y][x]++;
      },
      delPoint(x, y) {
        if (matrix[y][x]) matrix[y][x]--;
      },
      addDeck(x, y) {
        matrix[y][x] = 9;
      },
      delDeck(x, y) {
        matrix[y][x] = 0;
      }
    };
    methods[action + whatChange](x, y);
  };
  
  for (let i = 0 ; i < type ; i++) {
    let shiftX = pos ? i : 0;
    let shiftY = pos ? 0 : i;
    
    let dx = pos ? 0 : 1;
    let dy = pos ? 1 : 0;
    
    changeElement(x+shiftX, y+shiftY, 'Deck');
    changeElement(x+shiftX-dx, y+shiftY-dy, 'Point');
    changeElement(x+shiftX+dx, y+shiftY+dy, 'Point');
  }
  
  for (let i = 0 ; i < 3 ; i++) {
    let shiftX = pos ? -1 : i-1;
    let shiftY = pos ? i-1 : -1;
    
    let dx = pos ? type : i-1;
    let dy = pos ? i-1 : type;
    
    changeElement(x+shiftX, y+shiftY, 'Point');
    changeElement(x+dx, y+dy, 'Point');
  }
}

export function normalizeMatrix(matrix) {
  return matrix.map(row => row.map(v => v === 9 ? 1 : 0));
}