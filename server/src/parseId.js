'use strict';

const parseId = (id) => {
  let index = id.slice(0, -1);
  let player = id.substr(-1) === 'f' ? 'first' : 'second';
  let enemy = player === 'first' ? 'second' : 'first';
  
  return { index, player, enemy };
};

module.exports = parseId;