let redPlayer = "R";
let yellowPlayer = "Y";
let currentPlayer = redPlayer;

let gameOver = false;
let board;
let currentColumns; //helps with the gravity situation

const rows = 6;
const columns = 7;


//this functions goal is to set the pieces of the board game.
window.onload = function (){
    setGame();
}

function setGame(){
    board = [];
    currentColumns =[5, 5, 5, 5, 5, 5, 5]; //is the "border" or end point for the columns
                                            // further down i set r to be equal to currentColumns
                                            // if r < 0 it returns, finally r is updated for final height with a -1


    for(let r = 0; r < rows; r++){
        let row =[];
        for(let c = 0; c < columns; c++){
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile)
        }
        board.push(row);
    }//created a div, and set it to our "index" position. the positions r, and c are being interpreted 
    //as an index point. we combine the point with a "-". I added an event listener later to listen for a click
    //and then .append the board to add all our pieces. we are cycling through the array with a for loop.
}
function setPiece(){
    if (gameOver){
        return;
    }
    let coordinates = this.id.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);

    r = currentColumns[c]; //height row for specific column
    if (r < 0){
        return;
    }
//in the setPiece function, we use the coordinates and set them their id value and seperate them with a "-"
// the coordinates are given as (0-0)/[0-0] and we need to parseint because its a string
//the board[r][c] is the current position, and the function is checking that, and whether redPlayer is playing
// and adds whichever piece, yellow or red as needed.
    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == redPlayer){
        tile.classList.add("red-piece");
        currentPlayer = yellowPlayer
    }
    else {
        tile.classList.add("yellow-piece");
        currentPlayer = redPlayer
    }
    r -= 1; //row height for column
    currentColumns[c]=r; //update array

    checkWin();
}
//horz
function checkWin(){
    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns -3;c++){
            if (board[r][c]!= " "){
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2]==board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //vert
    for (let c=0; c < columns; c++){
        for (let r = 0; r < rows -3; r++){
            if (board[r][c] != " "){
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //antdiag
    for (let r = 0; r < rows -3; r++){
        for (let c = 0; c < columns -3; c ++){
            if (board[r][c]!= " "){
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //diag
    for (let r = 3; r < rows; r ++){
        for (let c = 0; c < columns -3; c++){
            if (board[r][c] != " "){
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}
function setWinner(r, c){
    let winner = document.getElementById("winner");
    if (board[r][c] == redPlayer){
        winner.innerText = "Red WINS !";
    } else {
        winner.innerText = "Yellow WINS !"
    }
    gameOver = true;

}