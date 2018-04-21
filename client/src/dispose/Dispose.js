import React, {Component} from 'react';
import './dispose.css';

import Field from '../field/Field.js';
import Navy from '../navy/Navy.js';
import ShipDragLayer from '../ship/ShipDragLayer'

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class Dispose extends Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      side: null,
      width: null,
      x: null,
      y: null,
    };
  }
  
  componentDidMount() {
    let side = Math.floor(this.node.offsetWidth*0.035);
    side = side % 2 ? side + 1 : side;
    this.setState({
      x: this.node.getBoundingClientRect().left + this.node.offsetWidth*0.02,
      y: this.node.getBoundingClientRect().top + this.node.offsetWidth*0.02,
      width: this.node.offsetWidth,
      side
    });
  }
  
  render() {
    let navy = null, field = null;
    if (this.state.side) {
      navy = <Navy side={this.state.side}/>;
      field = <Field matrix={this.props.matrix}
                     x={this.state.x}
                     y={this.state.y}
                     side={this.state.side}
                     width={this.state.width}
                     changeMatrixHandler={this.props.changeMatrixHandler}
      />;
    }
    return (
      <div className={'dispose'} ref={(node)=>{this.node = node}}>
        {field} {navy}
        {/*<ShipDragLayer />*/}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Dispose);