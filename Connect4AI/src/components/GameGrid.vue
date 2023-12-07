<template>
    <div>
        <div v-show="!gameOver" class="game-info">
            <h2 > 
                <span v-if="turn==player1">Joueur {{ this.p1 }}</span>
                <span v-else-if="turn==player2 && vsAI"> 
                    I.A : {{ mode === 0 ? "Facile" : mode === 1 ? "Moyenne" : mode === 2 ? "Difficile" : "Inconnu" }}
                </span>
                <span v-else >Joueur {{ this.p2 }}</span>
            </h2>
        </div>
        <div class="wrapper">
            <div id="board">
                <div
                    v-for="(column, columnIndex) in board[0]"
                    :style="{
                        left:columnIndex*50+'px'
                    }"
                    :key="'col-'+columnIndex"
                    class="column"
                    @click="takeTurn(columnIndex)"
                >
                </div>

                <div class="row" v-for="(row,rowIndex) in board" :key="rowIndex">
                    <svg v-for="(column, columnIndex) in row" :key="columnIndex" width="50" heigth="50">
                        <circle 
                        :class="{
                            empty: column == 0,
                            p1: column == 1,
                            p2: column == 2
                        }" 
                        cx="25"
                        cy="25"
                        r="20" 
                        />
                    </svg>
                </div>
            </div>
        </div>

        <div class="end-message" v-show="gameOver || isDraw">
            <div class="end-message-container">
                <div v-if="gameOver">
                    <h1> 
                        <span v-if="turn==player1">Joueur {{ this.p1 }} </span>
                        <span v-else-if="turn==player2 && !vsAI">Joueur {{ this.p2 }}</span>
                        <span v-else>I. A</span>
                    </h1>
                    <h3>
                        remporte la partie !
                    </h3>
                </div>
                <div v-if="isDraw">
                    <h1>Match Nul</h1>
                </div>
                <button class="reset-btn" type="button" @click="resetBoard()"> Nouvelle Partie </button> 
            </div>
        </div>
    </div>
</template>

<style>
.end-message{
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
}
.end-message-container {
    margin: auto;
    background-color: #d9d9d988;
    width: 250px;
    height: 200px;
    padding: 20px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    color: #000;
}

.end-message-container h1 {
    margin-bottom: 15px;
}

.end-message-container button {
    position: relative;
    
    margin: 35px 0;
}

.game-info{
     margin-bottom: 50px;
}
.game-info h2{
    color: #B9CAD9;
}

.wrapper{
  display: flex;
  justify-content: center;
}

.row {
  padding: 5px 0;
  background-color:rgba(20, 43, 155, 0.0);
  height: 60px;
}
svg{
  height: 100px;
}

circle.empty {
  fill: #d0d0d1;
}

circle.p1 {
  fill: #f42a50;
}

circle.p2 {
  fill: #e9db94;
}

.reset-btn{
  position: relative;
}

#board{
  position: relative;
}

.column {
  position: absolute;
  top: 0;
  width: 50px;
  height: 100%;
  transition: background-color 0.3s ease-out;
  background-color: transparent;
}

.column:hover{
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

</style>

<script>

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

import * as connect4 from '@/connect4.js';
import io, { connect } from 'socket.io-client';
export default {
    name:'GameGrid',
    props:{
        mode: Number,
        vsAI: Boolean
    },
    data() {
        return {
            result: {},
            board: [],
            // turn: Math.floor(Math.random()*2),
            turn: 0,
            player1: 0,
            player2: 1,
            p1: connect4.P1,
            p2: connect4.P2,
            empty: connect4.Empty,
            gameOver: false,
            isDraw:false,
            socket: io('http://localhost:3000'),
        }
    },
    methods: {
        selectBestColumn(){

            let validColumns = connect4.getValidColumns(this.board)
            let highestScore = -1000
            let column = Math.floor(Math.random * validColumns.length)

            for (let i = 0; i < validColumns.length; i++) {

                let newColumn = validColumns[i]

                // get le premier row disponible de la colone selectionné 
                let row = connect4.getOpenRow(this.board, newColumn)
    
                let boardCopy = connect4.copyBoard(this.board)

                connect4.dropPiece(boardCopy,row,newColumn,this.p2)
    
                let newScore = connect4.boardScore(boardCopy)

                if(newScore > highestScore){
                    highestScore = newScore
                    column = newColumn
                }
            }
            return column
        },

        resetBoard(){
            console.log("RESET");
            this.board = connect4.createBoard()
            this.gameOver = false
            this.turn = this.player1
            window.location.reload();
        },

        takeTurn(column){
            if(connect4.getValidColumns(this.board)==0){
                this.isDraw=true
            }
            if(this.vsAI){
                if(!this.gameOver && connect4.isValidColumn(this.board, column) && this.turn == this.player1){
                    let row = connect4.getOpenRow(this.board, column)
                    let player = this.turn == this.player1 ? this.p1 : this.p2
                    connect4.dropPiece(this.board, row, column, player)
                    if(connect4.isWinningMove(this.board, player)){
                        this.gameOver = true;
                    }else{
                        this.turn +=1
                        this.turn = this.turn % 2
                        sleep(500).then(() =>{
                                this.AITurn(this.mode)})   
                    }
                }
            }
            else{
                if(!this.gameOver && connect4.isValidColumn(this.board, column)){
                    let row = connect4.getOpenRow(this.board, column)
                    let player = this.turn == this.player1 ? this.p1 : this.p2
                    connect4.dropPiece(this.board, row, column, player)
                    if(connect4.isWinningMove(this.board, player)){
                        this.gameOver = true;
                    }else{
                        this.turn +=1
                        this.turn = this.turn % 2
                    }
                }
            }

            
        },

        AITurn(mode){
            let column = undefined
            //Easy mode
            if (mode == 0){
                column = this.selectBestColumn() 
            }
            //Medium mode
            else if(mode==1){
                this.result = connect4.minimax(this.board, 2, true)
                column = this.result.column
            }
            //Hard mode
            else if(mode==2){
                this.result = connect4.minimax_abp(this.board, 5,-Infinity, Infinity, true)
                column = this.result.column
            }
            else{
                console.log('random mode');
                column = this.selectBestColumn() 
            }
            
            let row = connect4.getOpenRow(this.board, column)

            connect4.dropPiece(this.board, row, column, this.p2)
            if(connect4.isWinningMove(this.board, this.p2)){
                this.gameOver = true
            }else{
                this.turn +=1
                this.turn = this.turn % 2
            }
        }
    },

    created() {
        this.board = connect4.createBoard()
        // console.log("BEGIN = ",this.board)
        
        this.socket.emit('message', 'Start game');

        this.socket.on('response', (msg) => {
            console.log(msg)
        })
        
    },

    watch: {
        mode: {
        handler(newMode) {
            // Faites quelque chose lorsque mode change
            console.log("Nouveau mode :", newMode);
        },
        },
        vsAI: {
        handler(newVsAI) {
            // Faites quelque chose lorsque vsAI change
            console.log("Nouveau vsAI :", newVsAI);
        },
        },
    },
}
</script>