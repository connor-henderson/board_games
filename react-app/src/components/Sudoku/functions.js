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

// Tried several original implementations but am currently am using this function
// inspired by the following paper: https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-s095-programming-for-the-puzzled-january-iap-2018/puzzle-8-you-wont-want-to-play-sudoku-again/MIT6_S095IAP18_Puzzle_8.pdf
// with a few twists (searches for currently possible nums at each square first instead of naively trying nums)
export function createSudokuSolution(board = createSudokuBoard()) {
  const [row, col] = findNextEmptySquare(board);
  if (row === -1) return board;
  const possibleNums = findPossibleNums(board, row, col);
  for (let num of possibleNums) {
    board[row][col] = num;
    if (createSudokuSolution(board)) return board;
    board[row][col] = "";
  }

  return false;
}

function findNextEmptySquare(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (typeof board[i][j] !== "number") {
        return [i, j];
      }
    }
  }

  return [-1, -1];
}

function generateRandomNum() {
    return Math.round(Math.random() * 8) + 1
}

function generateRandomIdx() {
    return Math.round(Math.random() * 8)
}

export function trimSolution(solution, n) {
    const board = JSON.parse(JSON.stringify(solution));

    for (let i = 0; i < n; i++) {
        const row = generateRandomIdx();
        const col = generateRandomIdx();
        board[row][col] = ""
    };
    return board
}

// __________________ OLD CODE __________________

// row, column, and box check

function createSudokuBoard() {
  let board = new Array(9);
  for (var i = 0; i < 9; i++) {
    board[i] = new Array(9).fill("");
  }

  fillDiagonals(board);
  return board;
}

// export function createSudokuSolution() {
//   let board = createSudokuBoard();
//   // need recursion so that you can keep track of where you erred

//   fillDiagonals(board);
//   assignPossibleNums(board);

//   assignExactNum(board);
// //   while (!boardComplete(board)) {
// //   }

//   console.log(board);
//   return board;
// }

// CHECK IF BOARD COMPLETE

function boardComplete(board) {
  const allNums = board.every((row, i) => {
    return row.every((entry) => typeof entry === "number");
  });

  return allNums;
}

// INITAL FILL (fill by diagonals or select boxes)

function fillDiagonals(board) {
  // diagonals numbering can be randomly generated
  board.forEach((row, i) => {
    board[i][i] = generateRandomNum();
    board[i][8 - i] = generateRandomNum();
  });
}

// POSSIBLE NUMS
function assignPossibleNums(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (typeof board[i][j] !== "number") {
        board[i][j] = findPossibleNums(board, i, j);
      }
    }
  }
  //   return board
}

function findPossibleNums(board, row, col) {
  let possibleNums = new Set(numbers);
  possibleByRow(board, possibleNums, row);
  possibleByCol(board, possibleNums, col);
  possibleByBox(board, possibleNums, row - (row % 3), col - (col % 3));

  return possibleNums;
}

function possibleByRow(board, nums, row) {
  board[row].forEach((entry) => {
    if (typeof entry === "number") {
      nums.delete(entry);
    }
    if (nums.size === 1) return nums;
  });
  return nums;
}

function possibleByCol(board, nums, col) {
  for (let i = 0; i < 9; i++) {
    let entry = board[i][col];
    if (typeof entry === "number") {
      nums.delete(entry);
    }
    if (nums.size === 1) return nums;
  }
  return nums;
}

function possibleByBox(board, nums, boxStartRow, boxStartCol) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let entry = board[boxStartRow + i][boxStartCol + j];
      if (typeof entry === "number") {
        nums.delete(entry);
      }
      if (nums.size === 1) return nums;
    }
  }
  return nums;
}

// EXACT NUM
function assignExactNum(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (typeof board[i][j] !== "number") {
        let exactNum = findExactNum(board, i, j);
        if (exactNum) {
          board[i][j] = exactNum;
        }
      }
    }
  }
}

function findExactNum(board, row, col) {
  let exactNums = new Set(numbers);

  exactByRow(board, exactNums, row);

  if (!exactNums.size) {
    exactByCol(board, (exactNums = new Set(numbers)), col);
  } else if (!exactNums.size) {
    exactByBox(
      board,
      (exactNums = new Set(numbers)),
      row - (row % 3),
      col - (col % 3)
    );
  }
  console.log(exactNums);

  if (exactNums.size === 1) return [...exactNums][0];
  else return false;
}

function exactByRow(board, nums, row) {
  board[row].forEach((entry) => {
    deleteEntry(nums, entry);
    if (nums.size === 1) return nums;
  });
  return nums;
}

function exactByCol(board, nums, col) {
  for (let i = 0; i < 9; i++) {
    let entry = board[i][col];
    deleteEntry(nums, entry);
    if (nums.size === 1) return nums;
  }
  return nums;
}

function exactByBox(board, nums, boxStartRow, boxStartCol) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let entry = board[boxStartRow + i][boxStartCol + j];
      deleteEntry(nums, entry);
      if (nums.size === 1) return nums;
    }
  }
  return nums;
}

function deleteEntry(nums, entry) {
  if (typeof entry === "number") {
    nums.delete(entry);
  } else if (typeof entry === "object") {
    [...entry].forEach((num) => nums.delete(num));
  }
}

// Checks for finished board

function checkRows(board) {
  board.every((row) => {
    let check = new Set(numbers);
    row.every((num) => {
      check.splice(check.indexOf(num), 1);
    });
    if (check.length) return false;
  });

  return true;
}

function checkCols(board) {
  board.every((row, i) => {
    let check = new Set(numbers);
    row.every((num, j) => {
      check.splice(check.indexOf(board[j][i]), 1);
    });
    if (check.length) return false;
  });

  return true;
}
