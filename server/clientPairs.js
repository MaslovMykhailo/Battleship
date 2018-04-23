'use strict';

module.exports = {
  addClientToPairs(pairs, connection, matrix) {
    let index = 0;
    while (pairs[index] && pairs[index].second) index++;
    console.log(index);
  
    if (pairs[index]) {
      pairs[index].second = { connection, matrix, id: index + 's' };
      return { waiting: false, index};
    } else {
      pairs[index] = {
        first: { connection, matrix, id: index + 'f' },
        second: null
      };
      return { waiting: true, index};
    }
  },
  delClientFromPairs(pairs, connection, matrix) {
  
  }
};


