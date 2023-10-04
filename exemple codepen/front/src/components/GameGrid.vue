<template>
    <div id="game">
        <table>
            <!-- Boucle pour créer le tableau du jeu en fonction des données -->
            <tr v-for="(row, rowIndex) in board" :key="rowIndex">
                <td
                v-for="(cell, columnIndex) in row"
                :key="columnIndex"
                @click="handleClick(columnIndex)"
                :class="{ player1: cell === 1, player2: cell === 2 }"
                ></td>
            </tr>
        </table>
    </div>
</template>

<style>

@keyframes fallFromTop {
    0% {
        transform: translateY(-1000%);
        opacity: 1;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

#game table {
    background-color: rgb(7, 21, 125);
    z-index: 1;
    margin: auto auto;
    border-collapse: separate;
    border-spacing: 10px; /* Ajustez cette valeur selon votre préférence */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Ajout d'une ombre */
}
#game td {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 10px;
    background-color: #8BC6EC;
    background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
    cursor: pointer;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3), /* Ajout d'une ombre */
                -2px -5px 10px rgba(255, 255, 255, 0.1); /* Ajout d'une ombre */
}
#game td.player1 {
    z-index: 0;
    background: rgb(219,0,0);
    background: radial-gradient(circle, rgba(219,0,0,1) 0%, rgba(233,53,53,1) 72%, rgba(131,0,0,1) 100%);
    border: 1px solid rgb(138, 57, 57); /* Couleur de bordure pour le style neumorphisme */
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.5);
    animation: fallFromTop 1s ease-in-out;
}
#game td.player2 {
    z-index: 0;
    background: rgb(219,168,0);
    background: radial-gradient(circle, rgba(219,168,0,1) 0%, rgba(233,191,53,1) 72%, rgba(131,101,0,1) 100%);
    border: 2px solid rgba(161, 145, 0, 0.611); /*Couleur de bordure pour le style neumorphisme*/
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.5);
    animation: fallFromTop 1s ease-in-out;
}

</style>

<script>
export default {
    data() {
        return {
            rows: 6,
            cols: 7,
            board: [],
            turn: 1, // 1 for player 1, 2 for player 2
            winner: null,
            moves: 0,
        };
    },
    created() {
        // Initialize the game board
        this.initializeBoard();
    },
    methods: {
        initializeBoard() {
            // Initialize the game board as a 2D array
            this.board = Array(this.rows)
            .fill()
            .map(() => Array(this.cols).fill(0));
        },
        handleClick(column) {
            // Check if the game is over
            if (this.winner !== null) {
                if (window.confirm('Game over!\n\nDo you want to restart?')) {
                    this.reset();
                }
                return;
            }
            
            // Find the first available row in the column
            let row;
            for (let i = this.rows - 1; i >= 0; i--) {
                if (this.board[i][column] === 0) {
                    row = i;
                    break;
                }
            }
            
            if (row === undefined) {
                window.alert('Column is full!');
            } else {
                // Make the move
                this.board[row][column] = this.turn;
                this.moves++;
                
                // Add the animation class to the cell
                const cell = document.querySelector(`#game table tr:nth-child(${row + 1}) td:nth-child(${column + 1})`);
                cell.classList.add('fall-from-top');

                // Check for a win or a tie
                if (this.checkWin(row, column, this.turn)) {
                    this.winner = this.turn;
                    window.alert("Player "+this.turn+" wins"); 

                } else if (this.moves >= this.rows * this.cols) {
                    this.winner = 0; // Tie
                }
                
                // Switch turns
                this.turn = 3 - this.turn;

            }
        },
        checkWin(row, column, player) {
            const rows = this.rows;
            const cols = this.cols;
            const board = this.board;
            
            // Fonction pour vérifier une séquence dans une direction donnée
            function checkDirection(dx, dy) {
                let count = 0;
                for (let step = -3; step <= 3; step++) {
                    const newRow = row + step * dx;
                    const newCol = column + step * dy;
                    
                    // Vérifie si les indices sont valides
                    if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols &&
                    board[newRow][newCol] === player
                    ) {
                        count++;
                        if (count >= 4) {
                            return true;
                        }
                    } else {
                        count = 0;
                    }
                }
                return false;
            }
            
            // Vérifie les 4 directions : horizontal, vertical, diagonale, anti-diagonale
            return (
                checkDirection(0, 1) || // Horizontal
                checkDirection(1, 0) || // Vertical
                checkDirection(1, 1) || // Diagonale
                checkDirection(1, -1)   // Anti-diagonale
            );
        },
        reset() {
            // Reset the game board and variables
            this.initializeBoard();
            this.turn = 1;
            this.winner = null;
            this.moves = 0;
        },
    },
};
</script>
