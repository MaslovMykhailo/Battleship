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
        
        const onClick = i && j && matrix && !matrix[j-1][i-1] && progressHandler ?
          progressHandler(i-1, j-1) : null;
        
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
          return <div className={'type1'} style={{
            width: side-2, height: side-2
          }}/>
        }
        case 2: {
          return <div className={'type2'} style={{
            width: Math.floor(side/5), height: Math.floor(side/5) ,
          }}/>
        }
        case 3: {
          const style = { height: Math.floor(side/10) };
          return (
          <div className={'type3'}>
            <div className={'elem-left'} style={style}/>
            <div className={'elem-right'} style={style}/>
          </div>)
        }
        case 4: {
          const styleLR = { height: Math.floor(side/10) };
          const styleC = { width: side-2, height: side-2, marginTop: -(Math.floor(side/3)+2) };
          return (
          <div className={'type4'}>
            <div className={'elem-center'} style={styleC}/>
            <div className={'elem-left'} style={styleLR}/>
            <div className={'elem-right'} style={styleLR}/>
          </div>)
        }
        default: {
          return null;
        }
      }
  }
  return null;
};

export default Table;