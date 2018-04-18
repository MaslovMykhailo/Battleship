import React from 'react';

import Deck from './Deck';

const DroppedShip = (props) => {
  const {type, pos, side} = props.shipState;
  
  const style = {
    opacity: 0.5,
    padding: 0,
    margin: 0,
  };
  
  return (
    <div style={style}>
      {new Array(type).fill(null).map((v, i) =>
        <Deck key={i} pos={pos} side={side}/>
      )}
    </div>
  )
};

export default DroppedShip;