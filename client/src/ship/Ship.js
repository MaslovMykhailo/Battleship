import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import Deck from './Deck.js';

const shipSource = {
  beginDrag(props, monitor) {
    return props.shipState;
  },
  endDrag(props, monitor) {
    if (monitor.didDrop() && !props.isDropped) {
      props.shipDroppedHandler(props.shipState);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    // connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Ship extends Component{
  render() {
    const style = {
      opacity: this.props.isDragging ? 0.5 : 1,
      padding: 0,
      margin: 0,
    };
    
    const {type, pos} = this.props.shipState;
    
    return this.props.connectDragSource(
      <div style={Object.assign(style, this.props.st)}>
        {new Array(type).fill(null).map((v, i) =>
          <Deck key={i} pos={pos} />
        )}
      </div>
    )
  }
}
  
export default DragSource('SHIP', shipSource, collect)(Ship);