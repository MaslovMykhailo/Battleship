import React from 'react';

import Start from '../start/Start.js';
import Dispose from '../dispose/Dispose.js';
import Game from '../game/Game.js';

import APP_STATUS from '../constants/APP_STATUS';
import EndOfGame from '../endOfGame/EndOfGame';


const Application = (props) => {
  const {
    curStatus,
    changeStatus,
    matrix,
    changeMatrixHandler,
    normalizeMatrixHandler,
    enemyMatrix,
    gameStatus,
    progressHandler
  } = props;
  
  switch (curStatus) {
    case APP_STATUS.start: {
      return (
        <Start changeStatus={changeStatus} nextStatus={'dispose'}/>
      );
    }
    case APP_STATUS.dispose: {
      return (
        <Dispose matrix={matrix}
                 changeMatrixHandler={changeMatrixHandler}
                 normalizeMatrixHandler={normalizeMatrixHandler}
        />
      )
    }
    case APP_STATUS.game: {
      return (
        <Game matrix={matrix}
              enemyMatrix={enemyMatrix}
              gameStatus= {gameStatus}
              progressHandler={progressHandler}
        />
      )
    }
    case APP_STATUS.endOfGame: {
      return (
        <EndOfGame gameStatus={gameStatus}
                   nextStatus={'dispose'}
                   changeStatus={changeStatus}
        />
      )
    }
    default: {
      return null;
    }
  }
};

export default Application;