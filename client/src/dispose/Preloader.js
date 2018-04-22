import React from 'react';

import './preloader.css';

const Preloader = (props) => {
  const blocks = new Array(16).fill(null).map((v, i) => (
    <span key={i} className={`block-${i+1}`}/>
  ));
  return <div className={'loader'} style={{top: (props.side+2)*11}}>{blocks}</div>;
};

export default Preloader;