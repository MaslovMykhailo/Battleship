import React from 'react';
import './rotatePrompt.css';
import rotateDeviceSVG from './rotate-device.svg';

const RotatePrompt = () => {
  return (
    <div className={'rotate-prompt'}>
      <span>Please rotate your device for comfortable game</span>
      <img src={rotateDeviceSVG} alt={'rotate-device'}/>
    </div>
  )
};

export default RotatePrompt;