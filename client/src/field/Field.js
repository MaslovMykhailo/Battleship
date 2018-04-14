import React, { Component } from 'react';

import Table from './Table';
import Ship from '../ship/Ship';

import {DropTarget} from 'react-dnd';

import { getCoord, getCoordInPx, canMoveShip, getCurrentDeck } from './findCoordFunc';

const fieldTarget = {
  drop(props, monitor, component) {
    component.changeHelperState({x: 0, y: 0, w: 0, pos: 0, vis: false});
  
    const {type, pos, id, isDropped} = monitor.getItem();
    const curDeck = getCurrentDeck(monitor);
    const {x, y} = getCoord(monitor, component, curDeck, pos);
    const {resXpx, resYpx} = getCoordInPx(component, x, y);
  
    if (canMoveShip({x, y, curDeck, type, pos}, props.matrix)) {
      component.dropShipHandler({x, y, resXpx, resYpx, type, id, pos, isDropped});
      return { successDrop: true };
    } else return { successDrop: false };
  },
  hover(props, monitor, component) {
    const curDeck = getCurrentDeck(monitor);
    const {type, pos} = monitor.getItem();
    const {x, y} = getCoord(monitor, component, curDeck, pos);
    const {resXpx, resYpx} = getCoordInPx(component, x, y);
    
    if (x > -1 && x + type - 1 < 10 && y > -1 && y < 10) {
      const newState = {
        x: resXpx,
        y: resYpx,
        w: 40*type,
        pos,
        vis: true,
        color: canMoveShip({x, y, curDeck, type, pos}, props.matrix) ? 'green' : 'red'
      };
      component.changeHelperState(newState);
    } else {
      component.changeHelperState({x: 0, y: 0, w: 0, pos: 0, vis: false});
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class Field extends Component {
  constructor(props) {
    super(props);
    this.field = null;
    this.state = {
      x: null,
      y: null,
      side: null,
      helper: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        vis: false
      },
      ships: []
    };
    
    this.dropShipHandler = this.dropShipHandler.bind(this);
    this.changeHelperState = this.changeHelperState.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      x: this.field.getBoundingClientRect().left,
      y: this.field.getBoundingClientRect().top,
      side: this.field.offsetWidth/10
    });
  }
  
  changeHelperState(newState) {
    const {x, y, w, pos, vis, color} = newState;
    this.setState({
      helper: {
        x, y, vis,
        width: pos ? w : 39,
        height: pos ? 39 : w,
        color: color
      }
    });
  }
  
  dropShipHandler(shipState) {
    const {id, isDropped} = shipState;
    const oldShips = this.state.ships;
    const newShips = oldShips.slice();
    
    if(isDropped) {
      let delShipIndex;
      for (let i = 0 ; i < oldShips.length ; i++) {
        if(oldShips[i].id === id) {
          delShipIndex = i; break;
        }
      }
      newShips.splice(delShipIndex, 1);
    }
    this.props.changeMatrixHandler(shipState, 'add');
  
    newShips.push(Object.assign(shipState, {isDropped: true}));
    
    this.setState({
      ships: newShips
    });
  }
  
  render() {
    const {width, height, x, y, vis, color} = this.state.helper;
    
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
    
    const createShipStyle = (shipState) => {
      return {
        position: 'absolute',
        left: shipState.resXpx,
        top: shipState.resYpx,
        width: shipState.type * 40
      }
    };
    
    return this.props.connectDropTarget(
      <div style={{margin: '1%'}}>
        <div style={helperStyle} />
        <Table setTableNode={(node) => {this.field = node}}/>
        {this.state.ships.map((s, i) => {
          return (
            <Ship
              key={i}
              st={createShipStyle(s)}
              shipState={s}
              changeMatrixHandler={this.props.changeMatrixHandler}
            />
          )
        })}
      </div>
    )
  }
}

export default DropTarget('SHIP', fieldTarget, collect)(Field);