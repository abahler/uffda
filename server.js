"use strict";

let socket_io = require('socket.io');
let http = require('http');
let express = require('express');
let app = express();
app.use(express.static('public'));

let server = http.Server(app);  // This will allow Socket.IO to run alongside express
let io = socket_io(server);     // Create a Socket.IO server
 
let users = []; // Array to keep track of user names (nicknames)
                // Needs to exist outside of any single connection

io.on('connection', (socket) => {   // A Socket.IO server is an EventEmitter, so we listen for events

    socket.on('message', (message) => {
        // Broadcast message to all clients except the one whose socket object we're using
        socket.broadcast.emit('message', message);  
    });

    // Get number of currently connected users
    let clients = io.sockets.clients();
    let numUsers = clients.server.eio.clientsCount;
    
    // Push the number of users and the list of all nicknames out to connected clients
    io.emit('updateNumUsers', numUsers);  // Send message to ALL clients, including connected one
    io.emit('updateUserList', users);
    
    socket.on('newNickname', (nickname) => {
        socket.nickname = nickname;
        users.push(socket.nickname);
        io.emit('updateUserList', users);
    });
});

server.listen(process.env.PORT || 8080);    // server.listen replaces app.listen when we add in http and socket_io
