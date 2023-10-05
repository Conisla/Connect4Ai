const express = require('express');
const {createBoard, isValidColumn, getOpenRow} = require('./connect4')

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

    // console.log('User connected');
    console.log(`UserId : ${socket.id} connected`)
    // console.log(`serveur : ${socket.rooms}`)
    
    socket.on('message', (data) => {
      console.log('Message du client :', data);
      io.emit('message', data);

      socket.emit('response', 'Message reçu !');
      
    });
    
    socket.emit('startgame', (createBoard()));

    socket.on('sendRow', (data) => {
      // getOpenRow(board, column)
    })

    // // mouvement fait
    // socket.on('makeMove', (move) => {
    //   // joueur qui joue J1 = 1 J2 = 0
    //   socket.on('player', (playerID) => {
    //     socket.broadcast.emit('move:received', move)
        
    //     // joueur qui doit joué
    //     socket.broadcast.emit('playermove', playerID)
    //     console.log(playerID)
    //   })
    //   // console.log(`move: ${move}`)
    // })

    // // socket.on('gameOver', (gameOver) => {
    // //   // socket.broadcast.emit('over', gameOver)
    // //   console.log(gameOver)
    // // })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left`);
    });
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});