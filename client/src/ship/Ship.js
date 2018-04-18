import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import Deck from './Deck.js';
import { canMoveShip } from '../helpFunctions/canMove';
import { changeMatrix } from '../helpFunctions/changeMatrix';

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
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Ship extends Component{
  constructor(props) {
    super(props);
    
    this.rotateHandler = this.rotateHandler.bind(this);
  }
  
  shouldComponentUpdate(nextProps) {
    return this.props.isDragging ||
      this.props.shipState.x !== nextProps.shipState.x ||
      this.props.shipState.y !== nextProps.shipState.y;
  }
  
  rotateHandler() {
    if (this.props.shipState.isDropped) {
      const {shipState, matrix, dropShipHandler} = this.props;
      
      const virtualMatrix = [];
      for (let i = 0 ; i < 10 ; i++) {
        virtualMatrix[i] = matrix[i].slice();
      }
      
      let newPos = !shipState.pos;
      changeMatrix(shipState, virtualMatrix, 'del');

      let canRotate = canMoveShip({
        x: shipState.x,
        y: shipState.y,
        type: shipState.type,
        pos: newPos
      }, virtualMatrix);
      
      if (canRotate) {
        changeMatrix(shipState, matrix, 'del');
        dropShipHandler(Object.assign(shipState, {pos: newPos}));
        this.forceUpdate();
      }
    }
  }
  
  render() {
    const style = {
      opacity: this.props.isDragging ? 0.5 : 1,
    };
    
    const {type, pos, side} = this.props.shipState;
    
    return this.props.connectDragSource(
      <div style={Object.assign(style, this.props.st)} onClick={this.rotateHandler}>
        {new Array(type).fill(null).map((v, i) =>
          <Deck key={i} pos={pos} side={side}/>
        )}
      </div>
    )
  }
}
  
export default DragSource('SHIP', shipSource, collect)(Ship);