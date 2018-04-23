'use strict';

const http = require('http');
const WebSocket = require('websocket').server;
const messageHandlers = require('./messageHandlers');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(3001, () => {
  console.log('Listen port 3001');
});

const ws = new WebSocket({
  httpServer: server,
  autoAcceptConnections: false
});

const pairs = [];

ws.on('request', (req) => {
  const connection = req.accept('', req.origin);
  console.log('Connected' + connection.remoteAddress);
  
  connection.on('message', message => {
    const dataName = message.type + 'Data';
    messageHandlers(message[dataName], pairs, connection);
  });
});
// const clients = [];
//
// const addClient = (connection, arr) => {
//   if (arr.length) {
//     if (arr[arr.length-1].second) {
//       clients.push({first: connection, second: null})
//     } else {
//       arr[arr.length-1].second = connection;
//     }
//   } else {
//     clients.push({first: connection, second: null})
//   }
// };
//
// const delClient = (connection, arr) => {
//   for (let c of arr) {
//     switch (connection) {
//       case c.first : {
//         c.first = null;
//         break;
//       }
//       case c.second : {
//         c.second = null;
//         break;
//       }
//     }
//   }
// };
//
// ws.on('request', (req) => {
//   const connection = req.accept('', req.origin);
//   addClient(connection, clients);
//   console.log('Connected' + connection.remoteAddress);
//
//   connection.on('message', (message) => {
//     const dataName = message.type + 'Data';
//     const data = message[dataName];
//
//     console.pos(message);
//     console.log('Received ' + data);
//
//     for (let c of clients) {
//       switch (connection) {
//         case c.first : {
//           if (c.second) {
//             c.second.send(data);
//           } else {
//             c.first.send('Waiting');
//           }
//           break;
//         }
//         case c.second : {
//           if (c.first) {
//             c.first.send(data);
//           } else {
//             c.second.send('Waiting');
//           }
//           break;
//         }
//       }
//     }
//
//     connection.on('close', (reasonCode, description) => {
//       delClient(connection, clients);
//       console.log('Disconnected ' + connection.remoteAddress);
//       console.pos({ reasonCode, description });
//     });
//   });
// });