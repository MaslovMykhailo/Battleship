'use strict';

const { delClientsFromPairs } = require('./clientPairs');
const createMessage = require('./createMessage');

const closeHandler = (connection, pairs) => {
  const { index, enemy } = findConnection(connection, pairs);
  if (index > -1) {
    if (pairs[index][enemy]) {
      pairs[index][enemy].connection.send(createMessage('victory', {
        gameStatus: 'victory',
        enemyMatrix: pairs[index][enemy].enemyMatrix
      }));
    }
    delClientsFromPairs(index, pairs);
  }
};

const findConnection = (connection, pairs) => {
  let index = -1;
  let enemy;
  for (let i = 0 ; i < pairs.length ; i++) {
    if (pairs[i]) {
      if (pairs[i].first && pairs[i].first.connection === connection) {
        index = i;
        enemy = 'second';
        break;
      }
      if (pairs[i].second && pairs[i].second.connection === connection) {
        index = i;
        enemy = 'first';
        break;
      }
    }
  }
  
  if (index !== -1 && !pairs[index][enemy]) enemy = undefined;
  
  return { index, enemy };
};

module.exports = closeHandler;