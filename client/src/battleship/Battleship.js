import React, { Component } from 'react';
import './battleship.css';

import socket from '../WebSocket/ws';

import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Application from '../application/Application';
import RotatePrompt from '../rotatePrompt/RotatePrompt';

import APP_STATUS from '../constants/APP_STATUS';

import { changeMatrix, normalizeMatrix } from '../helpFunctions/changeMatrix';


class Battleship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: APP_STATUS.start,
      matrix: new Array(10).fill(null).map(v => new Array(10).fill(0)),
      enemyMatrix: null,
      gameStatus: undefined,
      id: undefined,
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.changeMatrixHandler = this.changeMatrixHandler.bind(this);
    this.normalizeMatrixHandler = this.normalizeMatrixHandler.bind(this);
    this.progressHandler = this.progressHandler.bind(this);
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { gameStatus, id, matrix, enemyMatrix} = data;
      const self = this;
      
      const handlers = {
        unsuccessfulCreate() {
          self.setState({
            matrix: new Array(10).fill(null).map(v => new Array(10).fill(0))
          });
          self.changeStatus('dispose');
        },
        successfulCreate() {
          self.setState({
            enemyMatrix: new Array(10).fill(null).map(v => new Array(10).fill(0)),
            gameStatus, id
          });
          self.changeStatus('game');
        },
        progressResult() {
          self.setState({ gameStatus, enemyMatrix });
        },
        progressChange() {
          self.setState({
            gameStatus, matrix, enemyMatrix: self.state.enemyMatrix.slice()
          });
        },
        victory() {
          self.setState({ gameStatus, enemyMatrix });
          setTimeout(() => {self.changeStatus('endOfGame')}, 2000);
        },
        defeat() {
          self.setState({ gameStatus, matrix });
          setTimeout(() => {self.changeStatus('endOfGame')}, 2000);
        }
      };
      
      handlers[data.type]();
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
    if (newStatus === 'dispose') {
      this.setState({
        matrix: new Array(10).fill(null).map(v => new Array(10).fill(0)),
        enemyMatrix: null
      }
    )}
    this.setState({
      status: APP_STATUS[newStatus]
    });
  }
  
  progressHandler(x, y) {
    return () => {
      socket.send(JSON.stringify({
        type: 'progress', x, y, id: this.state.id
      }));
    }
  }
  
  render() {
    const { status, matrix, enemyMatrix, gameStatus, id } = this.state;
    
    return (
      <div className={'battleship'}>
        <Header />
        <RotatePrompt />
        <Application progressHandler={this.progressHandler}
                     changeStatus={this.changeStatus}
                     changeMatrixHandler={this.changeMatrixHandler}
                     normalizeMatrixHandler={this.normalizeMatrixHandler}
                     matrix={matrix}
                     enemyMatrix={enemyMatrix}
                     gameStatus={gameStatus}
                     curStatus={status}
                     id={id}
        />
        <Footer />
      </div>
    )
  }
}

export default Battleship;
