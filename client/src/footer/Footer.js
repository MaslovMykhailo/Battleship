import React from 'react';

import './footer.css';

import github from './github.svg';


const Footer = () => {
  return (
    <footer>
      Created by Michael Maslov
      <a className={'git'} href={'https://github.com/maslovmichail20/Battleship'}>github</a>
      <a href={'https://github.com/maslovmichail20/Battleship'}>
        <img className={'gitSVG'} src={github} alt={'github'}/>
      </a>
    </footer>
  )
};

export default Footer;