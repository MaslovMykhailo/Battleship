import React, {Component} from 'react'

class Table extends Component {
  
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    const style = {
      position: 'absolute',
      borderSpacing: '0 0',
      width: '400px',
      height: '400px',
      margin: '1% 3%',
      padding: 0,
      border: '1px solid black'
    };
    
    const createTr = (j) => {
      return new Array(10).fill(0).map((td, i) => (
        <td key={i + '' + j} style={{border: '1px solid black'}}/>
      ));
    };
  
    const tr = new Array(10).fill(0).map((tr, i) => (
      <tr key={i}>{createTr(i)}</tr>
    ));
  
    return(
      <table style={style} ref={this.props.setTableNode}>
        <tbody>
        {tr}
        </tbody>
      </table>
    )
  }
}

export default Table;