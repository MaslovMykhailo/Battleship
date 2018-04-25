'use strict';

const { addClientToPairs, delClientsFromPairs } = require('./clientPairs');
const { validateMatrix, progressHandler } = require('./matrixAction');
const createMessage = require('./createMessage');
const parseId = require('./parseId');

const messageHandlers = (message, pairs, connection) => {
  const data = JSON.parse(message);
  
  const handlers = {
    createMatrix(data) {
      const { matrix } = data;
      
      const success = validateMatrix(matrix);
      
      if (success) {
        const { waiting, index } = addClientToPairs(pairs, connection, matrix);
        if (!waiting) {
          pairs[index].first.connection.send(
            createMessage('successfulCreate', {
              id: pairs[index].first.id,
              gameStatus: 'playerProgress',
            })
          );
          pairs[index].second.connection.send(
            createMessage('successfulCreate', {
              id: pairs[index].second.id,
              gameStatus: 'enemyProgress',
            })
          );
        }
      } else {
        connection.send(createMessage('unsuccessfulCreate'));
      }
    },
    progress(data) {
      const { x, y, id } = data;
      const { index, player, enemy } = parseId(id);
      
      const progressStatus = progressHandler(x, y, pairs[index][player], pairs[index][enemy]);
      
      
      if (progressStatus !== 'victory') {
        const gameStatusForPlayer = progressStatus === 'hit' ? 'player' : 'enemy' + 'Progress';
        const gameStatusForEnemy = progressStatus === 'miss' ? 'player' : 'enemy' + 'Progress';
  
        pairs[index][player].connection.send(
          createMessage('progressResult', {
            gameStatus: gameStatusForPlayer,
            enemyMatrix: pairs[index][player].enemyMatrix
          })
        );
  
        pairs[index][enemy].connection.send(
          createMessage('progressChange', {
            gameStatus: gameStatusForEnemy,
            matrix: pairs[index][enemy].matrix
          })
        );
      } else {
        pairs[index][player].connection.send(
          createMessage('victory', {
            enemyMatrix: pairs[index][player].enemyMatrix
          })
        );
  
        pairs[index][enemy].connection.send(
          createMessage('defeat', {
            matrix: pairs[index][enemy].matrix
          })
        );
        
        delClientsFromPairs(index, pairs);
      }
    }
  };
  
  handlers[data.type](data);
};

module.exports = messageHandlers;