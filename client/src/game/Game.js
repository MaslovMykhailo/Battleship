import React, { Component } from 'react';
import Table from '../table/Table';

import './game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.node = null;
    this.state = {
      side: null
    }
  }
  
  componentDidMount() {
    let side = Math.floor(this.node.offsetWidth*0.035);
    side = side % 2 ? side + 1 : side;
    this.setState({ side });
  }
  
  render() {
    const { side } = this.state;
    const { matrix, enemyMatrix, gameStatus, progressHandler } = this.props;
  
    const playerIsActive = gameStatus === 'playerProgress' ? 1 : 0.5;
    const enemyIsActive = gameStatus === 'enemyProgress' ? 1 : 0.5;
    
    const playerTable = side ?
      <Table side={side} matrix={matrix} /> :
      null;
    
    const enemyTable = side ?
      <Table side={side} matrix={enemyMatrix}
             progressHandler={gameStatus === 'playerProgress' ? progressHandler : null}
      /> : null;
    
    return (
      <div className={'game-content'} ref={(node)=>{this.node = node}}>
        <div className={'player-table'} style={{opacity: enemyIsActive}}>{playerTable}</div>
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