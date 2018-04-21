import React, {Component} from 'react'
import './table.css';

class Table extends Component {
  
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    const { side } = this.props;
    
    const getData = (i, j) => {
      if (!i) {
        return j ? <span>{j}</span> : null;
      }
      if (!j) {
        return i ? <span>{String.fromCharCode(64+i)}</span> : null;
      }
      return null;
    };
    
    const createTr = (j) => {
      return new Array(11).fill(0).map((td, i) => {
        let className = !i || !j ? 'label' : '';
        return (
        <td className={className} key={i + '' + j} style={{width: side, height: side}}>
          {getData(i, j)}
        </td>
      )});
    };
  
    const tr = new Array(11).fill(0).map((tr, i) => (
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