'use strict';

const http = require('http');
const WebSocket = require('websocket').server;
const express = require('express');

const messageHandlers = require('./src/messageHandlers');
const closeHandler = require('./src/closeHandler');

require('events').EventEmitter.prototype._maxListeners = 100;


const wsPort = 8080;
const staticPort = 3001;

// WebSocket server
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(wsPort, () => { console.log('WebSocket server listen port 8080') });

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
      setImmediate(() => { closeHandler(connection, pairs) });
    });
  });
});


// static server
const app = express();

app.set('port', staticPort);
app.use(express.static('../client/build'));

app.listen(app.get('port'), () => {
  console.log(`Find the Battleship at: http://localhost:${app.get('port')}/`);
});
