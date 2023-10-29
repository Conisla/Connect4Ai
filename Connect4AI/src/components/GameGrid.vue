<template>
    <div>
      
        <h2 v-show="!gameOver" >Joueur <span v-if="turn==player1">{{ this.p1 }}</span><span v-else>{{ this.p2 }}</span></h2>
        
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

        <div v-show="gameOver">
            <h2>Joueur <span v-if="turn==player1">{{ this.p1 }} </span><span v-else>{{ this.p2 }}</span> a gagné !</h2>
            <button class="reset-btn" type="button" @click="resetBoard()"> Nouvelle Partie </button> 
        </div>
    </div>
</template>

<style>

h2{
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
  fill: transparent;
  stroke: #f42a50;
  stroke-width: 4px;
}

circle.p2 {
  fill: transparent;
  stroke: #e9db94;
  stroke-width: 4px;
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
            turn: 0,
            player1: 0,
            player2: 1,
            p1: connect4.P1,
            p2: connect4.P2,
            empty: connect4.Empty,
            gameOver: false,
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
        },

        takeTurn(column){
            if(!this.gameOver && connect4.isValidColumn(this.board, column)){


                let row = connect4.getOpenRow(this.board, column)
                let player = this.turn == this.player1 ? this.p1 : this.p2
               connect4.dropPiece(this.board, row, column, player)
                if(connect4.isWinningMove(this.board, player)){
                    this.gameOver = true;
                }else{
                    this.turn +=1
                    this.turn = this.turn % 2
                    
                    if(this.vsAI){
                        this.AITurn(this.mode)
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
}
</script>