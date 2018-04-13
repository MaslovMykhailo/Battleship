import React, {Component} from 'react';

import './start.css';

import startPicture from './start.jpg';

class Start extends Component {
  constructor(props) {
    super(props);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
  }
  
  changeStatusHandler() {
    this.props.changeStatus(this.props.newStatus);
  }
  
  render() {
    return (
      <div className={'startContent'}>
        <button className={'startButton'} type={'button'} onClick={this.changeStatusHandler}>
          <span>Start game!</span>
        </button>
        <img className={'startPicture'} src={startPicture} alt={'battleship'}/>
      </div>
    )
  }
}

export default Start;