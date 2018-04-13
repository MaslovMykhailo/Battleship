import React from 'react';

import './deck.css';

const Deck = (props) => {
  const style = {
    width: 36,
    height: 36,
    background: 'blue',
    marginRight: props.pos ? 4 : 0,
    marginBottom: props.pos ? 0 : 4,
    display: props.pos ? 'inline-block' : 'block'
  };
  return <div style={style}/>;
};

export default Deck;