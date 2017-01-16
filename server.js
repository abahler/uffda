"use strict";

let socket_io = require('socket.io');
let http = require('http');
let express = require('express');
let app = express();
app.use(express.static('public'));

let server = http.Server(app);  // This will allow Socket.IO to run alongside express
let io = socket_io(server);

io.on('connection', (socket) => {   // A Socket.IO server is an EventEmitter, so we listen for events
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log('Received message: ', message);
    });
});

server.listen(process.env.PORT || 8080);    // server.listen replaces app.listen when we add in http and socket_io