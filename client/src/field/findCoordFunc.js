export function getCoord(monitor, component, curDeck, pos) {
  const {x: clientX, y: clientY} = monitor.getClientOffset();
  const {x: stateX, y: stateY, side} = component.state;
  
  const realX = Math.floor((clientX - stateX)/side);
  const realY = Math.floor((clientY - stateY)/side);
  
  const x = pos ? realX - curDeck : realX;
  const y = pos ? realY : realY - curDeck;
  
  return {x, y};
}

export function getCoordInPx(component, resX, resY) {
  const {x: stateX, y: stateY, side} = component.state;
  return {
    resXpx: stateX + resX * side,
    resYpx: stateY + resY * side
  }
}

export function canMoveShip(shipState, matrix) {
  const {x, y, type, pos} = shipState;
  for (let i = 0 ; i < type ; i++) {
    if (pos) {
      if (matrix[y][x + i]) return false;
    } else {
      if (matrix[y + i][x]) return false;
    }
  }
  return true;
}