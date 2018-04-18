import React, {Component} from 'react'
import './table.css';

class Table extends Component {
  
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    // const style = {
    //   position: 'relative',
    //   float: 'left',
    //   borderSpacing: '0 0',
    //   width: '402px ',
    //   height: '402px',
    //   margin: '1% 3%',
    //   padding: 0,
    //   border: '1px solid black'
    // };
    
    const { side } = this.props;
    
    const createTr = (j) => {
      return new Array(10).fill(0).map((td, i) => (
        <td key={i + '' + j} style={{border: '1px solid black', width: side, height: side}}>
          {/*<div className={'content'} />*/}
        </td>
      ));
    };
  
    const tr = new Array(10).fill(0).map((tr, i) => (
      <tr key={i}>{createTr(i)}</tr>
    ));
  
    return(
      <table>
        <tbody>
        {tr}
        </tbody>
      </table>
    )
  }
}

export default Table;