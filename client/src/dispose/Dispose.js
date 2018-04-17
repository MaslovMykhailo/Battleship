import React, {Component} from 'react';
import './dispose.css';

import Field from '../field/Field.js';
import Navy from '../navy/Navy.js';

import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

class Dispose extends Component {
  render() {
    return (
      <div className={'dispose'}>
        <Field matrix={this.props.matrix}
               changeMatrixHandler={this.props.changeMatrixHandler}/>
        <Navy />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Dispose);