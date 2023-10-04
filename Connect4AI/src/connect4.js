const RowCount = 6
const ColumnCount = 7

// Créer un board vide 
export function createBoard() {
    let board = [];
    for(let row=0; row < 6; row++){
        board.push([]);
    }

    board.forEach(row => {
        for (let column = 0; column < 7; column++) {
            row.push(0);
        }
    });
    return board;
}

// Vérifier si une colonne donnée est jouable
export function isValidColumn(board, column) {
    return board[0][column] == 0   
}

export function getOpenRow(board, column) {
    for(let row = RowCount-1; row >= 0; row--){
        if (board[row][column] == 0) {
            return row
        }
    }
}

export function dropPiece(board,row, column, color){
    board[row][column] = color
    return board
}

export function isWinningMove(board, color){
    for(let c=0; c < ColumnCount-3; c++){
        for(let r=0; r < RowCount; r++){
            // console.log("Board = ",board);
            if(
                board[r][c] == color &&
                board[r][c+1] == color &&
                board[r][c+2] == color &&
                board[r][c+3] == color
            ){
                return true
            }
        }

    }
}