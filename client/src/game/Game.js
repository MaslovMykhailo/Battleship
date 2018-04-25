import React, { Component } from 'react';
import Table from '../field/Table';

import './game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      node: null,
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
    const { matrix, enemyMatrix } = this.props;
    
    const playerTable = side ? <Table side={side} matrix={matrix}/> : null;
    const enemyTable = side ? <Table side={side} matrix={enemyMatrix}/> : null;
  
    return (
      <div className={'game-content'} ref={(node)=>{this.node = node}}>
        <div className={'player-table'}>{playerTable}</div>
        <div className={'enemy-table'}>{enemyTable}</div>
      </div>
    )
  }
}

export default Game;