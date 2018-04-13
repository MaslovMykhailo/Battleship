import React, {Component} from 'react';

import Field from '../field/Field.js';
import Navy from '../navy/Navy.js';

import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

class Dispose extends Component {
  render() {
    return (
      <div>
        <Field matrix={this.props.matrix}
               changeMatrixHandler={this.props.changeMatrixHandler}/>
        <Navy />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Dispose);