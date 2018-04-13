import React, { Component } from 'react';
import './Battleship.css';

import Header from './header/Header.js';
import Footer from './footer/Footer.js';

import Start from './start/Start.js';
import Dispose from './dispose/Dispose.js';


const APP_STATUS = {
  start: 1,
  dispose: 2,
  game: 3,
  victory: 4,
  defeat: 5
};

const Application = (props) => {
  switch (props.curStatus) {
    case APP_STATUS.start: {
      return (
        <Start changeStatus={props.changeStatus} newStatus={'dispose'}/>
      );
    }
    default: {
      return (
        <Dispose matrix={props.matrix}
                 changeMatrixHandler={props.changeMatrixHandler}
        />
      )
    }
  }
};

class Battleship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: APP_STATUS.start,
      matrix: new Array(10).fill(new Array(10).fill(0))
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.changeMatrixHandler = this.changeMatrixHandler.bind(this);
  }
  
  changeMatrixHandler(shipState, oldShipState) {
     const {x, y, type, pos} = shipState;
     const {x: oldX, y: oldY} = oldShipState;
     
     const changedMatrix = [];
     for (let i = 0 ; i < 10 ; i++) {
       changedMatrix[i] = this.state.matrix[i].slice();
     }
    
     for (let i = 0 ; i < type ; i++) {
        if (pos) {
          if (oldX + i < 10)changedMatrix[oldY][oldX+i] = 0;
          if (oldY - 1 > -1) changedMatrix[oldY-1][oldX+i] = 0;
          if (oldY+1 < 10 && oldX+i < 10)changedMatrix[oldY+1][oldX+i] = 0;
          
          if (x + i < 10)changedMatrix[y][x+i] = 1;
          if (y - 1 > -1) changedMatrix[y-1][x+i] = 2;
          if (y+1 < 10 && x+i < 10)changedMatrix[y+1][x+i] = 2;
        } else {
          if (oldY+1 < 10)changedMatrix[oldY+i][oldX] = 0;
          if (oldX-1 > -1) changedMatrix[oldY+i][oldX-1] = 0;
          if (oldY+1 < 10 && oldX+1 < 10)changedMatrix[oldY+i][oldX+1] = 0;
          
          if (y+1 < 10)changedMatrix[y+i][x] = 1;
          if (x-1 > -1) changedMatrix[y+i][x-1] = 2;
          if (y+1 < 10 && x+1 < 10)changedMatrix[y+i][x+1] = 2;
        }
     }
     
     for (let i = 0 ; i < 3 ; i++) {
       if (pos) {
         if (oldY-1+i>-1 && oldX-1>-1 && oldY-1+i<10) changedMatrix[oldY-1+i][oldX-1] = 0;
         if (oldY-1+i>-1 && oldY-1+i<10 && oldX+type<10) changedMatrix[oldY-1+i][oldX+type] = 0;
         
         if (y-1+i>-1 && x-1>-1 && y-1+i<10) changedMatrix[y-1+i][x-1] = 2;
         if (y-1+i>-1 && y-1+i<10 && x+type<10) changedMatrix[y-1+i][x+type] = 2;
       } else {
         if (oldY-1>-1 && oldX+i-1>-1 && oldX+1+i<10) changedMatrix[oldY-1][oldX+i-1] = 0;
         if (oldX+i-1>-1 && oldX+i-1<10 && oldY+type<10)changedMatrix[oldY+type][oldX+i-1] = 0;
         
         if (y-1>-1 && x+i-1>-1 && x+1+i<10) changedMatrix[y-1][x+i-1] = 2;
         if (x+i-1>-1 && x+i-1<10 && y+type<10)changedMatrix[y+type][x+i-1] = 2;
       }
     }
     
     console.log(changedMatrix);
     
     this.setState({
       matrix: changedMatrix
     });
  }
  
  changeStatus(newStatus) {
    this.setState({
      status: APP_STATUS[newStatus]
    });
  }
  
  render() {
    return (
      <div>
        <Header />
        <Application curStatus={this.state.status}
                     changeStatus={this.changeStatus}
                     changeMatrixHandler={this.changeMatrixHandler}
                     matrix={this.state.matrix}
        />
        <Footer />
      </div>
    )
  }
}

export default Battleship;
