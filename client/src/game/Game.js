import React, { Component } from 'react';
import Table from '../table/Table';

import './game.css';
import arrow from './arrow.svg';

import socket from '../WebSocket/ws';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.node = null;
    this.timer = null;
    this.state = {
      side: null,
      timer: null
    };
  }
  
  componentDidMount() {
    let side = Math.floor(this.node.offsetWidth*0.035);
    side = side % 2 ? side + 1 : side;
    this.setState({ side });
  }
  
  componentWillUnmount() {
    this.clearTimer();
  }
  
  setTimer() {
    this.timer = setTimeout(() => {
        socket.send(JSON.stringify({
          type: 'progress', x: null, y: null, id: this.props.id
        }));
      }, 30000);
  }
  
  clearTimer() {
    clearTimeout(this.timer);
  }
  
  render() {
    const { side } = this.state;
    const { matrix, enemyMatrix, gameStatus, progressHandler } = this.props;
  
    if (side && gameStatus === 'playerProgress') {
      this.clearTimer();
      this.setTimer();
    } else {
      this.clearTimer();
    }
    
    const playerIsActive = gameStatus === 'playerProgress' ? 1 : 0.5;
    const enemyIsActive = gameStatus === 'enemyProgress' ? 1 : 0.5;
    
    const playerTable = side ?
      <Table side={side} matrix={matrix}/> :
      null;
    
    const enemyTable = side ?
      <Table side={side} matrix={enemyMatrix}
             progressHandler={gameStatus === 'playerProgress' ? progressHandler : null}
      /> : null;
    
    const arrowName = gameStatus === 'playerProgress' ? 'arrow-right' : 'arrow-left';
    
    return (
      <div className={'game-content'} ref={(node)=>{this.node = node}}>
        <div className={'player-table'} style={{opacity: enemyIsActive}}>{playerTable}</div>
        <img className={arrowName} src={arrow} alt={'arrow'}/>
        <div className={'enemy-table'}
             style={{
               opacity: playerIsActive,
               cursor: gameStatus === 'playerProgress' ? 'pointer' : 'default'
             }}
        >{enemyTable}</div>
      </div>
      
    )
  }
}

export default Game;