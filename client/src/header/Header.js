import React from 'react';

import './header.css';
import anchor from './anchor.png';

const Header = () => {
  return (
    <header>
      Battleship
      <img className={'anchor'} src={anchor} alt={'anchor'}/>
    </header>
  )
};

export default Header;