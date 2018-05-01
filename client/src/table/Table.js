import React, {Component} from 'react'
import './table.css';

class Table extends Component {
  
  shouldComponentUpdate(nextProps) {
    return this.props.matrix !== nextProps.matrix;
  }
  
  render() {
    const { side, matrix, progressHandler } = this.props;
    
    const createTr = (j) => {
      return new Array(11).fill(0).map((td, i) => {
        let className = !i || !j ? 'label' : '';
        
        const onClick = i && j && matrix && !matrix[j-1][i-1] && progressHandler ? progressHandler(i-1, j-1) : null;
        
        return (
        <td className={className} key={i + '' + j}
            style={{width: side, height: side}}
            onClick={onClick}
        >
          {getContent(i, j, matrix, side)}
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

const getContent = (i, j, matrix, side) => {
  if (!i) {
    return j ? <span>{j}</span> : null;
  }
  if (!j) {
    return i ? <span>{String.fromCharCode(64+i)}</span> : null;
  }
  if (matrix) {
      switch (matrix[j-1][i-1]) {
        case 1: {
          return <div style={{
            width: side-2, height: side-2,
            backgroundColor: 'blue', marginLeft:1
          }}/>
        }
        case 2: {
          return <div style={{
            width: 5, height: 5,
            backgroundColor: 'blue', marginLeft:10
          }}/>
        }
        case 3: {
          return <div style={{
            width: 5, height: 5,
            backgroundColor: 'red', marginLeft:10
          }}/>
        }
        case 4: {
          return <div style={{
            width: side-2, height: side-2,
            backgroundColor: 'red', marginLeft:1
          }}/>
        }
        default: {
          return null;
        }
      }
  }
  return null;
};

export default Table;