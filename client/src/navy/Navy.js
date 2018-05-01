import React, {Component} from 'react';
import './navy.css';
import Ship from '../ship/Ship.js';
import DroppedShip from '../ship/DroppedShip.js';

class Navy extends Component {
  constructor(props) {
    super(props);
  
    const createShips = () => {
      const ships = [];
      for (let i = 4 ; i > 0 ; i--) {
        ships.push(new Array(5-i).fill(null).map((v, k) => {
          return {
            x: null,
            y: null,
            pos: true,
            id: k+''+(5-i),
            type: i,
            side: this.props.side,
            isDropped: false
          }
        }));
      }
      return ships;
    };
    
    this.state = {
      ships: createShips(),
      countOfDroppedShip: 0
    };
    
    this.shipDroppedHandler = this.shipDroppedHandler.bind(this);
  }
  
  shipDroppedHandler(shipState) {
    const {type, id} = shipState;
    const newState = this.state.ships.slice();
    const counter = this.state.countOfDroppedShip+1;
    
    newState[4-type].map(s => {
      if (s.id === id) {
        s.isDropped = true;
        return s;
      } else {
        return s;
      }
    });
    
    if (counter === 10) this.props.navyIsReady();
    
    this.setState({
      ships: newState,
      countOfDroppedShip: counter
    });
  }
  
  shouldComponentUpdate() {
    return this.state.countOfDroppedShip !== 10;
  }
  
  chooseShip(shipState) {
    return shipState.isDropped ?
      <DroppedShip
        key={shipState.id}
        shipState={shipState}
      /> :
      <Ship
        key={shipState.id}
        shipState={shipState}
        shipDroppedHandler={this.shipDroppedHandler}
      />
  }
  
  render() {
    const shipsRender = this.state.ships.map((v, i) => {
      return (
        <div key={i-10}>
          <div key={i+10} style={{marginBottom: this.props.side/8}}>
          {v.map(s => {
            return this.chooseShip(s);
          })}
          </div>
          <div key={i} style={{"clear": "both"}}/>
        </div>
      )}
    );
    
    return <div className={'navy'}>{shipsRender}</div>;
  }
}

export default Navy;