const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.HTML' );
});

io.on('connection', (socket) => {
    io.emit('a user connected')
    console.log('a user connected');
    socket.on('disconnect', () => {
        io.emit('a user disconnected')
        console.log('a user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

io.emit('connection', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

server.listen(3000, () => {
    console.log("Listening to *:3000");
});