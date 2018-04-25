import React, { Component } from 'react';
import './Battleship.css';

import socket from './webSocketInterfase/ws';

import Header from './header/Header.js';
import Footer from './footer/Footer.js';

import Start from './start/Start.js';
import Dispose from './dispose/Dispose.js';
import Game from './game/Game.js';

import { changeMatrix, normalizeMatrix } from './helpFunctions/changeMatrix';

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
    case APP_STATUS.dispose: {
      return (
        <Dispose matrix={props.matrix}
                 changeMatrixHandler={props.changeMatrixHandler}
                 normalizeMatrixHandler={props.normalizeMatrixHandler}
        />
      )
    }
    case APP_STATUS.game: {
      return (
        <Game matrix={props.matrix} enemyMatrix={props.enemyMatrix}/>
      )
    }
    default: {
      return null;
    }
  }
};

class Battleship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: APP_STATUS.start,
      matrix: new Array(10).fill(null).map(v => new Array(10).fill(0)),
      enemyMatrix: null
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.changeMatrixHandler = this.changeMatrixHandler.bind(this);
    this.normalizeMatrixHandler = this.normalizeMatrixHandler.bind(this);
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'unsuccessfulCreate') {
        this.setState({
          matrix: new Array(10).fill(null).map(v => new Array(10).fill(0))
        });
        this.changeStatus('dispose');
      }
      if (data.type === 'successfulCreate') {
        this.setState({
          enemyMatrix: new Array(10).fill(null).map(v => new Array(10).fill(0))
        });
        this.changeStatus('game');
      }
    }
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
  
  normalizeMatrixHandler() {
    const changedMatrix = normalizeMatrix(this.state.matrix);
  
    socket.send(JSON.stringify({type: 'createMatrix', matrix: changedMatrix}));
    
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
                     normalizeMatrixHandler={this.normalizeMatrixHandler}
                     matrix={this.state.matrix}
                     enemyMatrix={this.state.enemyMatrix}
        />
        <Footer />
      </div>
    )
  }
}

export default Battleship;
