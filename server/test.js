'use strict';

const { progressHandler } = require('./matrixAction');

const m = new Array(10).fill(null).map(e => new Array(10).fill(0));
// for (let i = 0 ; i < 10 ; i++) {
//   m[i] = new Array(10).fill(0);
// }

m[7][9] = 1;
// m[8][9] = 1;
// m[9][9] = 1;

console.log(progressHandler(9, 7, m));
console.log(m);
// console.log(progressHandler(9, 8, m));
// console.log(m);
// console.log(progressHandler(9, 9, m));
// console.log(m);