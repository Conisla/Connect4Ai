const express = require('express');
const {createBoard, isValidColumn, getOpenRow, isWinningMove, dropPiece, Red, Yellow} = require('./connect4')

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
    
    socket.on('message', data => {
      // console.log('Message du client :', data);
      socket.broadcast.emit('message:received', data)

      socket.emit('response', 'Message reçu !');
      
    });

    let gameBoard = createBoard();
    io.emit('startgame', (gameBoard));

    socket.on('makeMove', ({ column, board, turn, gameOver })=> {
      if (!gameOver && isValidColumn(board, column)) {
        // console.log(turn)

        let row = getOpenRow(board, column);
        let color = turn == this.player1 ? Red : Yellow;

        board = dropPiece(board, row, column, color);

        io.emit('dropPiece', board, color);

        if (isWinningMove(board, color)) {
          let gameOver = true;
          // socket.emit('gameOver', (gameOver))
        }else {
          turn += 1
          turn = turn % 2
          socket.emit('turnPlayer', (turn))
          console.log(turn)
        }
      }
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