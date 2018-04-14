import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import Deck from './Deck.js';

const shipSource = {
  beginDrag(props, monitor) {
    const shipState = props.shipState;
    
    if (shipState.isDropped) {
      props.changeMatrixHandler(shipState, 'del');
    }
    
    return shipState;
  },
  endDrag(props, monitor) {
    const { shipState, changeMatrixHandler, shipDroppedHandler } = props;
    const { isDropped } = shipState;
    
    if (monitor.didDrop()) {
      if (monitor.getDropResult().successDrop) {
        if (!isDropped) shipDroppedHandler(shipState);
      } else {
        if (isDropped) changeMatrixHandler(shipState, 'add');
      }
    } else {
      if (isDropped) changeMatrixHandler(shipState, 'add');
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
  shouldComponentUpdate(nextProps) {
    return this.props.isDragging ||
      this.props.shipState.x !== nextProps.shipState.x ||
      this.props.shipState.y !== nextProps.shipState.y;
  }
  
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