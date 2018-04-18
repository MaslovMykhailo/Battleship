import React, { Component } from 'react';
import './Battleship.css';

import Header from './header/Header.js';
import Footer from './footer/Footer.js';

import Start from './start/Start.js';
import Dispose from './dispose/Dispose.js';

import { changeMatrix } from './helpFunctions/changeMatrix';

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
    const changedMatrix = [];
    for (let i = 0 ; i < 10 ; i++) {
      changedMatrix[i] = this.state.matrix[i].slice();
    }
    
    changeMatrix(shipState, changedMatrix, action);
    
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
      <div className={'battleship'}>
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
