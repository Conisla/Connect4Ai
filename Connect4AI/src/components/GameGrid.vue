<template>
    <div>
        
        <h1>PUISSANCE 4</h1>

        <div class="toggle-ia-btn">
            <p>
                Vous jouez contre :
                <span v-if="vsAI">IA</span>
                <span v-else>Joueur</span>
            </p>
            <label class="switch">
                <input type="checkbox" v-model="vsAI">
                <span class="slider round"></span>
            </label>
        </div>
        
        <h2 v-show="!gameOver" >Joueur <span v-if="turn==player1">{{ this.red }}</span><span v-else>{{ this.yellow }}</span></h2>
        
        <div v-show="gameOver">
            <h2>Joueur <span v-if="turn==player1">{{ this.red }} </span><span v-else>{{ this.yellow }}</span> a gagné !</h2>
            <button class="reset-btn" type="button" @click="resetBoard()"> Nouvelle Partie </button> 
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
                            red: column == 1,
                            yellow: column == 2
                        }" 
                        cx="25"
                        cy="25"
                        r="20" 
                        />
                    </svg>
                </div>

            </div>

        </div>

    </div>
</template>

<style>
/* Styles pour le toggle switch */
.toggle-ia-btn{
    margin: 2% 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.wrapper{
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.row {
    padding: 5px 0;
    background-color:rgb(20, 43, 155);
    height: 60px;
}

circle.empty {
    fill: white;
}

circle.red {
    fill: red;
}

circle.yellow {
    fill: yellow;
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
import * as connect4 from '@/connect4.js';
import io from 'socket.io-client';
export default {
    name:'GameGrid',
    data() {
        return {
            board: [],
            turn: 0,
            player1: 0,
            player2: 1,
            red: connect4.Red,
            yellow: connect4.Yellow,
            empty: connect4.Empty,
            gameOver: false,
            vsAI: false,
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
                let row = connect4.getOpenRow(this.board, newColumn)
                let boardCopy = connect4.copyBoard(this.board)

                connect4.dropPiece(boardCopy,row,newColumn,this.yellow)
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
        },

        takeTurn(column){
            if(!this.gameOver && connect4.isValidColumn(this.board, column)){


                let row = connect4.getOpenRow(this.board, column)
                let color = this.turn == this.player1 ? this.red : this.yellow
               connect4.dropPiece(this.board, row, column, color)
                if(connect4.isWinningMove(this.board, color)){
                    this.gameOver = true;
                }else{
                    this.turn +=1
                    this.turn = this.turn % 2
                    if(this.vsAI){this.AITurn()}
                }
            }
        },
        AITurn(){
            let column = this.selectBestColumn()
            let row = connect4.getOpenRow(this.board, column)
            connect4.dropPiece(this.board, row, column, this.yellow)
            if(connect4.isWinningMove(this.board, this.yellow)){
                this.gameOver = true
            }else{
                this.turn +=1
                this.turn = this.turn % 2
            }
        }
    },

    created() {
        this.board = connect4.createBoard()
        console.log("BEGIN = ",this.board)
        
        this.socket.emit('message', 'Start game');

        this.socket.on('response', (msg) => {
            console.log(msg)
        })
        
    },
}
</script>