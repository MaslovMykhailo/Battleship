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
  
  changeMatrixHandler(shipState, action) {
    const {x, y, type, pos} = shipState;
  
    const changedMatrix = [];
    for (let i = 0 ; i < 10 ; i++) {
      changedMatrix[i] = this.state.matrix[i].slice();
    }
    
    const changeElement = (x, y, whatChange) => {
      if (x < 0 || x > 9 || y < 0 || y > 9) return null;
      
      const methods = {
        addPoint(x, y) {
          changedMatrix[y][x]++;
        },
        delPoint(x, y) {
          if (changedMatrix[y][x]) changedMatrix[y][x]--;
        },
        addDeck(x, y) {
          changedMatrix[y][x] = 9;
        },
        delDeck(x, y) {
          changedMatrix[y][x] = 0;
        }
      };
      
      methods[action + whatChange](x, y);
    };
    
     for (let i = 0 ; i < type ; i++) {
       let shiftX = pos ? i : 0;
       let shiftY = pos ? 0 : i;
  
       let dx = pos ? 0 : 1;
       let dy = pos ? 1 : 0;
       
       changeElement(x+shiftX, y+shiftY, 'Deck');
       changeElement(x+shiftX-dx, y+shiftY-dy, 'Point');
       changeElement(x+shiftX+dx, y+shiftY+dy, 'Point');
     }
     
     for (let i = 0 ; i < 3 ; i++) {
       let shiftX = pos ? -1 : i-1;
       let shiftY = pos ? i-1 : -1;
       
       let dx = pos ? type : i-1;
       let dy = pos ? i-1 : type;
       
       changeElement(x+shiftX, y+shiftY, 'Point');
       changeElement(x+dx, y+dy, 'Point');
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
