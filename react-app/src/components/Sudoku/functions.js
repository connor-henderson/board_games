// row, column, and box check
const testBoard = [
  [3, 1, 6, 5, 7, 8, 4, 9, 2],
  [5, 2, 9, 1, 3, 4, 7, 6, 8],
  [4, 8, 7, 6, 2, 9, 5, 3, 1],
  [2, 6, 3, 4, 1, 5, 9, 8, 7],
  [9, 7, 4, 8, 6, 3, 1, 2, 5],
  [8, 5, 1, 7, 9, 2, 6, 4, 3],
  [1, 3, 8, 9, 4, 7, 2, 5, 6],
  [6, 9, 2, 3, 5, 1, 8, 7, 4],
  [7, 4, 5, 2, 8, 6, 3, 1, 9],
];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createSudokuBoard() {
  let board = new Array(9);
  for (var i = 0; i < 9; i++) {
    board[i] = new Array(9).fill("");
  }

  return board;
}

export function createSudokuSolution() {
  let board = createSudokuBoard();

  // diagonals numbering can be randomly generated
  fillDiagonals(board);
  assignPossibleNums(board);


  console.log(board);
  return board;
}

function fillDiagonals(board) {
  board.forEach((row, i) => {
    board[i][i] = Math.ceil(Math.random() * 8) + 1;
    board[i][8 - i] = Math.ceil(Math.random() * 8) + 1;
  });

//   return board;
}

function assignPossibleNums(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (typeof board[i][j] !== "number") {
        let possibleNums = findPossibleNums(board, i, j);
        board[i][j] = new Set(possibleNums);
      }
    }
  }
//   return board
}

function findPossibleNums(board, row, col) {
  let possibleNums = new Array(...numbers);
  possibleNums = filterByRow(board, possibleNums, row);
  possibleNums = filterByCol(board, possibleNums, col);
  possibleNums = filterByBox(
    board,
    possibleNums,
    row - (row % 3),
    col - (col % 3)
  );
  if (!possibleNums.length) console.log("end issue", possibleNums);

  return possibleNums;
}

// Single Row/Col/Box checks

function filterByRow(board, validNums, row) {
  board[row].forEach((entry) => {
    if (typeof entry === "number" && validNums.includes(entry)) {
      validNums.splice(validNums.indexOf(entry), 1);
      if (!validNums.length) console.log("row issue at entry", entry);
    }
  });
  return validNums;
}

function filterByCol(board, validNums, col) {
  for (let i = 0; i < 9; i++) {
    let entry = board[i][col];
    if (typeof entry === "number" && validNums.includes(entry)) {
      validNums.splice(validNums.indexOf(entry), 1);
      if (!validNums.length) console.log("col issue at entry", entry);
    }
  }
  return validNums;
}

function filterByBox(board, validNums, boxStartRow, boxStartCol) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let entry = board[boxStartRow + i][boxStartCol + j];
      if (typeof entry === "number" && validNums.includes(entry)) {
        validNums.splice(validNums.indexOf(entry), 1);
      }
    }
  }
  return validNums;
}

// All Rows/Cols/Boxes checks

function checkRows(board) {
  board.every((row) => {
    let check = new Array(...numbers);
    row.every((num) => {
      check.splice(check.indexOf(num), 1);
    });
    if (check.length) return false;
  });

  return true;
}

function checkCols(board) {
  board.every((row, i) => {
    let check = new Array(...numbers);
    row.every((num, j) => {
      check.splice(check.indexOf(board[j][i]), 1);
    });
    if (check.length) return false;
  });

  return true;
}

function checkBoxes(board) {
  // determine the "root" of the box and then run the same function every time

  // how to determine the root of the box?
  //   for (let i = 0; i < 3; i++) {
  //     // col
  //     for (let j = 0; j < 3; j++) {
  //       // row
  //       let check = new Array(...numbers)
  //       for (let k = 0; k < 7; k+=3) {
  //         // boxCol
  //         // check row
  //         console.log("row", i + k, "; col", j);
  //         for (let l = 0; l < 7; l+=3) {
  //           // check col
  //           // check.splice(check.indexOf(board[i+k][j+l]), 0);
  //         }
  //       }
  //       // if (check.length) return false;
  //     }
  return;
}
