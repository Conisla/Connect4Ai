const RowCount = 6
const ColumnCount = 7
const Red = 1
const Yellow = 2
const Empty = 0

// Retourne le nombre de valeur pour chaque clés (0:Empty 1:player1 2:player2)
function count(inputArray, item) {
    const map = inputArray.reduce((acc,key) => acc.set(key, (acc.get(key) || 0) + 1), new Map())
    return map.get(item) || 0
}

function getScore(section) {
    let score=0
    if(count(section,Yellow)==4){
        score += 100
    }
    if (count(section,Yellow)==3 && count(section, Empty)==1) {
        score+=10
    }
    if (count(section,Yellow)==2 && count(section, Empty)==2) {
        score += 5
    }
    if (count(section,Red)==3 && count(section, Empty)==1) {
        score -= 80
    }

    return score
}

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

export function copyBoard(board) {
    let boardCopy = [...board]
    board.forEach((row, rowIndex) => {
        boardCopy[rowIndex] = [...row]
    });
    return boardCopy
}

export function boardScore(board) {
    let score = 0

    //center column 
    let centerColumnArray = []
    let  centerColumn = Math.floor(ColumnCount / 2)

    for (let row = 0; row < RowCount; row++) {
        centerColumnArray.push(board[row][centerColumn])
    }
    let centerPieces = count(centerColumnArray, Yellow)
    score += centerPieces*5

    // Score Rows 
    board.forEach(row => {
        for (let column = 0; column < ColumnCount-3; column++) {
            let section = row.slice(column, column+4)
            score += getScore(section)
        }
    });

    //score Columns
    for (let column = 0; column < ColumnCount; column++) {
        let columnArray = []
        for (let row = RowCount-1; row >= 0 ; row--) {
            columnArray.push(board[row][column])
        }

        for (let row = 0; row < RowCount-3; row++) {
            let section = columnArray.slice(row, row + 4)
            score += getScore(section)
        }
    }

    //Score Diagonales montantes
    for (let row = RowCount-1; row >= RowCount-3; row--) {
        for (let column = 0; column < ColumnCount-3; column++) {
            let section = []
            for (let i = 0; i < 4; i++) {
                section.push(board[row - i][column + i])
            }
            score += getScore(section)
        }
    }

    //Score Diagonales Descendantes
    for (let row = 0; row < RowCount-3; row++) {
        for (let column = 0; column < ColumnCount-3; column++) {
            let section = []
            for (let i = 0; i < 4; i++) {
                section.push(board[row + i][column + i])
            }
            score += getScore(section)
        }
    }
        
    return score
}

// Vérifier si une colonne donnée est jouable
export function isValidColumn(board, column) {
    return board[0][column] == 0   
}

export function getValidColumns(board) {
    let validColumns = []
    for (let column = 0; column < ColumnCount; column++) {
        if( isValidColumn(board,column)){
            validColumns.push(column)
        }
    }
    return validColumns
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

    // Check all rows
    for(let c=0; c < ColumnCount - 3; c++){
        for(let r=0; r < RowCount; r++){
            if(
                board[r][c] == color &&
                board[r][c+1] == color &&
                board[r][c+2] == color &&
                board[r][c+3] == color
            ){ return true }
        }
    }

    // Check all columns 
    for (let c = 0; c < ColumnCount; c++) {
        for (let r = RowCount - 1; r >= RowCount - 3; r--) {
            if (
                board[r][c] == color &&
                board[r-1][c] == color &&
                board[r-2][c] == color &&
                board[r-3][c] == color
            ){ return true }
        }
    }

    // Check all diag upward 
    for (let c = 0; c < ColumnCount - 3; c++) {
        for (let r = RowCount-1; r >= RowCount-3; r--) {
            if (
                board[r][c] == color &&
                board[r-1][c+1] == color &&
                board[r-2][c+2] == color &&
                board[r-3][c+3] == color
            ){ return true }
        }
    }

    // Check all diag downward 
    for (let c = 0; c < ColumnCount - 3; c++) {
        for (let r = 0; r < RowCount - 3; r++) {
            if (
                board[r][c] == color &&
                board[r+1][c+1] == color &&
                board[r+2][c+2] == color &&
                board[r+3][c+3] == color
            ){ return true }
        }
    }

}