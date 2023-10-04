const express = require('express');

const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*"
    }
});


app.get('/', (req, res) => {
  res.send('<h1>Server ExpressJS</h1>');
});

io.on('connection', (socket) => {
    socket.join("some room");
    // console.log('User connected');
    console.log(`UserId : ${socket.id}`)
    // console.log(`serveur : ${socket.rooms}`)
    
    socket.on('message', (data) => {
      console.log('Message du client :', data);
      io.emit('message', data);

      socket.emit('response', 'Message reçu !');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});