import React from 'react';

const Helper = (props) => {
  const { width, height, x, y, vis, color } = props.helper;
  
  const helperStyle = {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.5,
    zIndex: 1,
    left: x,
    top: y,
    display: vis ? 'block' : 'none',
    background: color
  };
  
  return <div style={helperStyle}/>
};

export default Helper;