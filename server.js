"use strict";

let socket_io = require('socket.io');
let http = require('http');
let express = require('express');
let app = express();
app.use(express.static('public'));

let server = http.Server(app);  // This will allow Socket.IO to run alongside express
let io = socket_io(server);     // Create a Socket.IO server

/*
 * ENHANCEMENTS TO ADD:
 * 1. DONE - Show # of users online
 * 2. Add support for nicknames
 * 3. Show a '<user> is typing...' message whenever appropriate
 *
 */
 
let users = [];

io.on('connection', (socket) => {   // A Socket.IO server is an EventEmitter, so we listen for events
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log('Received message: ', message);
        // Broadcast message to all clients except the one whose socket object we're using
        socket.broadcast.emit('message', message);  
    });

    // Get number of currently connected users
    let clients = io.sockets.clients();
    let numUsers = clients.server.eio.clientsCount;
    
    // console.log('this: ', this);     // 'this' is an empty object
    io.emit('updateNumUsers', numUsers);  // Send message to ALL clients, including connected one
    
    socket.on('newNickname', function(nickname) {
        socket.nickname = nickname;
        users.push(socket.nickname);
        console.log('Users: ', users);
        io.emit('updateUserList', users);
    });
});

server.listen(process.env.PORT || 8080);    // server.listen replaces app.listen when we add in http and socket_io