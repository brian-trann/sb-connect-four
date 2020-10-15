/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let row = 0; row < HEIGHT ;row++ ){
    board[row] = [...Array(WIDTH)]
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  // creates a tablerow with an id="column-top"
  top.addEventListener("click", handleClick);
  // adds eventListener; runs handleClick on click
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    // creates a tabledata cell for the number of columns; id="X"
    top.append(headCell);
    //appends each cell, to the column-top
  }
  htmlBoard.append(top);
  //appends the top column to the htmlBoard

  // add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // creates a tablerow for every row, depending on the HEIGHT
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // creates a tabledata cell, depending on how many columns in WIDTh
      cell.setAttribute("id", `${y}-${x}`);
      // sets each cell id="y-x" 
      // id will be used as a coordinate system to keep track of pieces
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {

  for(let y = HEIGHT-1; y>=0 ; y--){
    if (!board[y][x]){
      return y
    }
  }
  return null;
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div')
  piece.classList.add('piece')
  piece.classList.add(`player${currPlayer}`)
  const cell = document.getElementById(`${y}-${x}`);
  cell.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {

  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  
  placeInTable(y, x);
  board[y][x] = currPlayer

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // need to check every row in board > every cell in row > cell needs to be defined
  if (board.every(row=>row.every(cell=>cell=cell))){
    endGame("TIE")
  }

  // switch players
  // switch currPlayer 1 <-> 2
  (currPlayer === 1) ? (currPlayer =2) : (currPlayer=1)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // nested loop to look at all coordinates Y,X
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // x + adjacent pieces, so you add 1,2,3
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
