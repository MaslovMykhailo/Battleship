import React, { Component } from 'react';

import './endOfGame.css';

class EndOfGame extends Component {
  constructor(props) {
    super(props);
    
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
  }
  
  changeStatusHandler() {
    const { changeStatus, nextStatus } = this.props;
    changeStatus(nextStatus);
  }
  
  render() {
    const { gameStatus, description } = this.props;
    const button = gameStatus + '-button';
    const caption = gameStatus.toUpperCase();
    
    return (
      <div className={gameStatus}>
        <span>{caption}</span>
        <button className={button} type={'button'} onClick={this.changeStatusHandler}>
          <span>Start game again!</span>
        </button>
        <span>{description}</span>
      </div>
    )
  }
}

export default EndOfGame;