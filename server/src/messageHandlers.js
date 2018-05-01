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
          const clients = pairs[index];
          
          clients.first.connection.send(
            createMessage('successfulCreate', {
              id: pairs[index].first.id,
              gameStatus: 'playerProgress',
            })
          );
          clients.second.connection.send(
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
      
      const clients = pairs[index];
      const progressStatus = progressHandler(x, y, clients[player], clients[enemy]);
      
      if (progressStatus !== 'victory') {
        const gameStatusForPlayer = progressStatus === 'hit' ? 'playerProgress' : 'enemyProgress';
        const gameStatusForEnemy = progressStatus === 'miss' ? 'playerProgress' : 'enemyProgress';
  
        clients[player].connection.send(
          createMessage('progressResult', {
            gameStatus: gameStatusForPlayer,
            enemyMatrix: clients[player].enemyMatrix
          })
        );
        clients[enemy].connection.send(
          createMessage('progressChange', {
            gameStatus: gameStatusForEnemy,
            matrix: clients[enemy].matrix
          })
        );
      } else {
        clients[player].connection.send(
          createMessage('victory', {
            gameStatus: 'victory',
            enemyMatrix: pairs[index][player].enemyMatrix
          })
        );
        clients[enemy].connection.send(
          createMessage('defeat', {
            gameStatus: 'defeat',
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