export function getCoord(monitor, props, curDeck, pos) {
  const {x: clientX, y: clientY} = monitor.getClientOffset();
  const {x: stateX, y: stateY, side} = props;
  
  const realX = Math.floor((clientX - stateX )/(side+2));
  const realY = Math.floor((clientY - stateY )/(side+2));

  const x = pos ? realX - curDeck : realX;
  const y = pos ? realY : realY - curDeck;
  
  return {x, y};
}

export function getCoordInPx(side, width, resX, resY) {
  let d = side > 45 ? 2 : 1;
  return {
    resXpx: Math.floor(width*0.02 + resX * (side+2)) + d + side + 2,
    resYpx: Math.floor(width*0.02 + resY * (side+2)) + d + side + 2
  }
}

export function getCurrentDeck(monitor, pos, side) {
  const { x: clientX, y: clientY } = monitor.getInitialClientOffset();
  const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset();

  return pos ? Math.floor((clientX - sourceX) / (side+2)) :
               Math.floor((clientY - sourceY) / (side+2));
}