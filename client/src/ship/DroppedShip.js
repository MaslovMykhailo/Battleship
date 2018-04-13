import React from 'react';

import Deck from './Deck';

const DroppedShip = (props) => {
  const style = {
    opacity: 0.5,
    padding: 0,
    margin: 0,
  };
  
  const {type, pos} = props.shipState;
  
  return (
    <div style={style}>
      {new Array(type).fill(null).map((v, i) =>
        <Deck key={i} pos={pos} />
      )}
    </div>
  )
};

export default DroppedShip;