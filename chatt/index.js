const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//Jag försöker bygga ut den här nedan så att den inte bara syns i konsolen, utan också skickar meddelande till alla anslutna 
//användare att en ny användare har anslutit. iom att det är ett meddelande från servern, ska jag lägga själva meddelandet från servern
//här eller ska det endast göras från .html-filen, då servern i sig registrerar när en ny användare ansluter?   
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('newUser', 'A new user connected');
    socket.on('disconnect', () => {
        console.log("a user disconnected");
        socket.broadcast.emit('lostUser', 'A user disconnected')
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
