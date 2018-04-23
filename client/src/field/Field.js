import React, { Component } from 'react';

import Table from './Table';
import Ship from '../ship/Ship';
import Helper from './Helper';

import {DropTarget} from 'react-dnd';

import { getCoord, getCoordInPx, getCurrentDeck } from '../helpFunctions/findCoordFunc';
import { canMoveShip, canMoveHelper } from '../helpFunctions/canMove';

const fieldTarget = {
  drop(props, monitor, component) {
    component.changeHelperState({x: 0, y: 0, w: 0, pos: 0, vis: false});
  
    const { side, width } = props;
    const {type, pos, id, isDropped} = monitor.getItem();
    const curDeck = getCurrentDeck(monitor, pos, side);
    const {x, y} = getCoord(monitor, props, curDeck, pos);
    const {resXpx, resYpx} = getCoordInPx(side, width, x, y);
  
    if (canMoveShip({x, y, curDeck, type, pos}, props.matrix)) {
      component.dropShipHandler({x, y, resXpx, resYpx, type, id, pos, side, isDropped});
      return { successDrop: true };
    } else return { successDrop: false };
  },
  hover(props, monitor, component) {
    
    const { side, width } = props;
    const {type, pos} = monitor.getItem();
    const curDeck = getCurrentDeck(monitor, pos, side);
    const {x, y} = getCoord(monitor, props, curDeck, pos);
    const {resXpx, resYpx} = getCoordInPx(side, width ,x, y);
  
    if (canMoveHelper({x, y, type, pos})) {
      const newState = {
        x: resXpx, y: resYpx, side,
        w: (side+2)*type, vis: true, pos,
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
    this.state = {
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
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.ships !== nextState.ships;
  // }
  
  changeHelperState(newState) {
    const {x, y, w, pos, vis, color} = newState;
    const { side } = this.props;
    
    this.setState({
      helper: {
        x, y, vis, color,
        width: pos ? w : side+2,
        height: pos ? side+2 : w
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
    const createShipStyle = (shipState) => {
      return {
        position: 'absolute',
        left: shipState.resXpx+2,
        top: shipState.resYpx+2,
        display: shipState.pos ? 'flex' : 'block'
      }
    };
    
    const ships = this.state.ships.map((s, i) => {
      return (
        <Ship
          key={i}
          st={createShipStyle(s)}
          shipState={s}
          changeMatrixHandler={this.props.changeMatrixHandler}
          matrix={this.props.matrix}
          dropShipHandler={this.dropShipHandler}
        />
      )
    });
    
    return this.props.connectDropTarget(
      <div style={{padding: '2% 2% 1%', width: '46%', position: 'relative', float:'left'}}>
        <Helper helper={this.state.helper}/>
        <Table side={this.props.side} matrix={this.props.waiting ? this.props.matrix : undefined}/>
        {!this.props.waiting ? ships : null}
      </div>
    )
  }
}

export default DropTarget('SHIP', fieldTarget, collect)(Field);