import React, { Component } from 'react';

import './intoBattleButton.css';


class IntoBattleButton extends Component {
  constructor(props) {
    super(props);
    this.enemySearchHandler = this.enemySearchHandler.bind(this);
  }
  
  enemySearchHandler() {
    this.props.waitingHandler();
  }
  
  render() {
    const { ready, side } = this.props;
    let onClick = null;
    let opacity = 0.5;
    let top = (side+2)*8;
    if (ready) {
      onClick = this.enemySearchHandler;
      opacity = 1;
    }
    
    return (
      <button className={'into-battle'}
              type={'button'}
              onClick={onClick}
              style={{opacity, top}}>
        <span>Into Battle!</span>
      </button>
    )
  }
}

export default IntoBattleButton;