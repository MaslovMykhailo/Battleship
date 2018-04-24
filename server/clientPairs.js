'use strict';

module.exports = {
  addClientToPairs(pairs, connection, matrix) {
    let index = 0;
    while (pairs[index] && pairs[index].second) index++;
  
    if (pairs[index]) {
      pairs[index].second = {
        connection,
        matrix,
        id: index + 's',
        enemyMatrix: createEmptyMatrix()
      };
      return { waiting: false, index};
    } else {
      pairs[index] = {
        first: {
          connection,
          matrix,
          id: index + 'f',
          enemyMatrix: createEmptyMatrix()
        },
        second: null
      };
      return { waiting: true, index};
    }
  },
  delClientFromPairs(pairs, connection, matrix) {
  
  }
};

const createEmptyMatrix = () => (
  new Array(10).fill(null).map(v => new Array(10).fill(0))
);