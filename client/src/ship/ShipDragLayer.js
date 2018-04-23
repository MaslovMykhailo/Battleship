import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import Deck from './Deck';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function collect(monitor) {
  return {
    shipState: monitor.getItem(),
    isDragging: monitor.isDragging(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
  };
}

// function snapToGrid(x, y) {
//   const snappedX = Math.round(x / 32) * 32;
//   const snappedY = Math.round(y / 32) * 32;
//
//   return [snappedX, snappedY]
// }

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  
  let { x, y } = currentOffset;
  
  // if (props.snapToGrid) {
  //   x -= initialOffset.x;
  //   y -= initialOffset.y;
  //   [x, y] = snapToGrid(x, y);
  //   x += initialOffset.x;
  //   y += initialOffset.y;
  // }
  
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  }
}

class ShipDragLayer extends Component {
  render() {
    const { shipState, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }
    
    const { pos, side, type } = shipState;
    
    // console.log(offset);
    
    // const ship = new Array(type).fill(null).map((v, i) => <Deck key={i} pos={pos} side={side}/>);
    
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {/*{ship}*/}
          <Deck pos={pos} side={side}/>
        </div>
      </div>
    )
  }
}

export default DragLayer(collect)(ShipDragLayer);