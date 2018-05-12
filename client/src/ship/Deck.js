import React from 'react';


const Deck = (props) => {
  let d1 = props.side > 45 ? 4 : 2;
  let d2 = props.side > 45 ? 6 : 4;
  const style = {
    width: props.side - d1,
    height: props.side - d1,
    background: 'blue',
    cursor: 'pointer',
    marginRight: props.pos ? d2 : 0,
    marginBottom: props.pos ? 0 : d2,
    display: props.pos ? 'inline-block' : 'block'
  };
  return <div style={style}/>;
};

export default Deck;