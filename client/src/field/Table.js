import React, {Component} from 'react'
import './table.css';

class Table extends Component {
  
  shouldComponentUpdate(nextProps) {
    return !!nextProps.matrix;
  }
  
  render() {
    const { side, matrix } = this.props;
    
    const getData = (i, j, matrix) => {
      if (!i) {
        return j ? <span>{j}</span> : null;
      }
      if (!j) {
        return i ? <span>{String.fromCharCode(64+i)}</span> : null;
      }
      if (matrix) {
        return matrix[j-1][i-1] ?
          <div style={{width: side-2, height: side-2, backgroundColor: 'blue', marginLeft:1}}/> :
          null;
      }
      return null;
    };
    
    const createTr = (j) => {
      return new Array(11).fill(0).map((td, i) => {
        let className = !i || !j ? 'label' : '';
        return (
        <td className={className} key={i + '' + j} style={{width: side, height: side}}>
          {getData(i, j, matrix)}
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