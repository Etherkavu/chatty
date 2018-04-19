var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const uuidv4 = require('uuid/v4');
const ws = require('ws');
var connections = 0;
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

function sendConnections(number, mod){
  if (mod === 'up'){
     connections = connections + 1;
  }else if (mod === 'down'){
     connections = connections - 1;
  }
  const outgoingMessage = {
      messageType: 'userCount',
      count: connections
    };
    console.log("sending user count");
  wss.broadcast(JSON.stringify(outgoingMessage));
}

wss.on('connection', (ws) => {
  sendConnections(connections, 'up');
  console.log('Client connected');
  ws.on('message', function incoming(message) {
    newMessage = JSON.parse(message)
    console.log('user', newMessage.content.username, 'sent', newMessage.content.content);
    const outgoingMessage = {
      messageType: newMessage.content.type,
      id: uuidv4(),
      content: newMessage.content.content,
      username: newMessage.content.username,
      colour: newMessage.content.colour
    };
    // send this message to everyone
    console.log("sending:", outgoingMessage)
    wss.broadcast(JSON.stringify(outgoingMessage));

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => sendConnections(connections, 'down'));

});