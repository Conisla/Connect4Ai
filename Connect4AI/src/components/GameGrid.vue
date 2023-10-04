<template>
    <div>
        GAMEGRID
        <h4>Player <span v-if="turn==player1">{{ this.red }}</span><span v-else>{{ this.yellow }}</span></h4>

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
.wrapper{
    display: flex;
    justify-content: center;
    margin-top: 5%;
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
import * as connect4 from '@/connect4.js'
export default {
    name:'GameGrid',
    data() {
        return {
            board: [],
            turn: 0,
            player1: 0,
            player2: 1,
            red: 1,
            yellow: 2,
            empty: 0,
            gameOver: false
        }
    },
    methods: {
        takeTurn(column){
            if(!this.gameOver && connect4.isValidColumn(this.board, column)){

                let row = connect4.getOpenRow(this.board, column)

                let color = this.turn == this.player1 ? this.red : this.yellow

                console.log("BEFORE",this.board)

                console.log("DropPiece",connect4.dropPiece(this.board, row, column, color))
               
                console.log("AFTER",this.board)

                if(connect4.isWinningMove(this.board, color)){
                    console.log('WINNER !!!!!!!');
                    this.gameOver = true;
                }else{
                    this.turn +=1
                    this.turn = this.turn % 2
                }
            }
        }
    },

    created() {
        this.board = connect4.createBoard()
        console.log("BEGIN = ",this.board)
    },
}
</script>