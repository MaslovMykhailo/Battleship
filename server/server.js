'use strict';

const http = require('http');
require('events').EventEmitter.prototype._maxListeners = 100;
const WebSocket = require('websocket').server;
const messageHandlers = require('./src/messageHandlers');
const closeHandler = require('./src/closeHandler');


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
  
  connection.on('message', message => {
    const dataName = message.type + 'Data';
    messageHandlers(message[dataName], pairs, connection);
  
    connection.on('close', () => {
      closeHandler(connection, pairs);
    });
  });
});
