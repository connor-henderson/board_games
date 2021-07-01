// row, column, and box check

// diagonals do not need to match so they can be done first!

let numbers = new Array(9);
numbers = numbers.map((_, i) => i);

let numbers2 = [];
numbers.forEach((num) => numbers2.push(num.pop()));

function createBoard() {
    let board = new Array(9);
    for (var i = 0; i < 9; i++) {
      board[i] = new Array(9).fill("");
    }

    return board
}


export function createSudokuSolution() {
  const solution = [];

  let board = createBoard();
  board = fillDiagonals(board);
  console.log(board)
  //   console.log(board);

  // each square and row and column must have one of each number
  // all must be true at the same time
  // start with a random number, then consecutively pick a random number to show from the remaining

  //   board.forEach(row => {
  //       row.forEach(square => {
  //           const nextNum = Math.ceil(Math.random() * 8) + 1;

  //       })
  //   })

  //   console.log(checkBoxes(numbers));
  return solution;
}

function fillDiagonals(board) {
  board.forEach((row, i) => {
    board[i][i] = Math.ceil(Math.random() * 8) + 1;
    board[i][8 - i] = Math.ceil(Math.random() * 8) + 1;
  });

  return board;
}

function checkRows(board) {
  board.every((row) => {
    let check = numbers;
    row.every((num) => {
      check.splice(check.indexOf(num), 1);
    });
    if (check.length) return false;
  });

  return true;
}

function checkCols(board) {
  board.every((row, i) => {
    let check = numbers;
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
  //       let check = numbers;
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

// for (let i = 0; i < 3; i++) {
//     // col
//     for (let j = 0; j < 3; j++) {
//       // row

//       for (let i = 0; i < 3; i++) {
//         // col
//         for (let j = 3; j < 6; j++) {
//           // row

//           for (let i = 0; i < 3; i++) {
//             // col
//             for (let j = 6; j < 8; j++) {
//               // row

//               for (let i = 0; i < 3; i++) {
//                 // col
//                 for (let j = 0; j < 3; j++) {
//                   // row

//                   for (let i = 3; i < 6; i++) {
//                     // col
//                     for (let j = 0; j < 3; j++) {
//                       // row

//                       for (let i = 6; i < 8; i++) {
//                         // col
//                         for (let j = 0; j < 3; j++) {
//
