'use strict';

const { addClientToPairs } = require('./clientPairs');
const validateMatrix = require('./validateMatrix');
const createMessage = require('./createMessage');

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
            createMessage('successfulCreate', { id: pairs[index].first.id })
          );
          pairs[index].second.connection.send(
            createMessage('successfulCreate', { id: pairs[index].second.id })
          );
        }
      } else {
        connection.send(createMessage('unsuccessfulCreate'));
      }
    }
  };
  
  handlers[data.type](data);
};

module.exports = messageHandlers;