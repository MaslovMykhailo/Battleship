import React, {Component} from 'react';

import './start.css';

class Start extends Component {
  constructor(props) {
    super(props);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
  }
  
  changeStatusHandler() {
    this.props.changeStatus(this.props.nextStatus);
  }
  
  render() {
    return (
      <div className={'startContent'}>
        <button className={'startButton'} type={'button'} onClick={this.changeStatusHandler}>
          <span>Start game!</span>
        </button>
      </div>
    )
  }
}

export default Start;