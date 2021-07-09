// const testBoard = [
// 	[3, 1, 6, 5, 7, 8, 4, 9, 2],
// 	[5, 2, 9, 1, 3, 4, 7, 6, 8],
// 	[4, 8, 7, 6, 2, 9, 5, 3, 1],
// 	[2, 6, 3, 4, 1, 5, 9, 8, 7],
// 	[9, 7, 4, 8, 6, 3, 1, 2, 5],
// 	[8, 5, 1, 7, 9, 2, 6, 4, 3],
// 	[1, 3, 8, 9, 4, 7, 2, 5, 6],
// 	[6, 9, 2, 3, 5, 1, 8, 7, 4],
// 	[7, 4, 5, 2, 8, 6, 3, 1, 9],
// ];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// "*CreateSudokuSolution(board)" and helper functions from the following paper's python solution:
// https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-s095-programming-for-the-puzzled-january-iap-2018/puzzle-8-you-wont-want-to-play-sudoku-again/MIT6_S095IAP18_Puzzle_8.pdf

export function fastCreateSudokuSolution(board) {
	const [i, j] = findNextEmptySquare(board);
	if (i === -1) return true;

	for (let num = 1; num < 10; num++) {
		if (isValid(board, i, j, num)) {
			const implications = makeImplications(board, i, j, num);
			if (fastCreateSudokuSolution(board)) return true;
			undoImplications(board, implications);
		}
	}
	return false;
}

function makeImplications(board, i, j, num) {
	const sectors = [
		[0, 3, 0, 3],
		[3, 6, 0, 3],
		[6, 9, 0, 3],
		[0, 3, 3, 6],
		[3, 6, 3, 6],
		[6, 9, 3, 6],
		[0, 3, 6, 9],
		[3, 6, 6, 9],
		[6, 9, 6, 9],
	];

	board[i][j] = num;
	const impl = [[i, j, num]];
	for (let k = 0; k < sectors.length; k++) {
		let sectInfo = [];
		let vset = new Set(numbers);
		for (let x = sectors[k][0]; x < sectors[k][1]; x++) {
			for (let y = sectors[k][2]; y < sectors[k][3]; y++) {
				if (board[x][y] !== "") {
					vset.delete(board[x][y]);
				}
			}
		}
		for (let x = sectors[k][0]; x < sectors[k][1]; x++) {
			for (let y = sectors[k][2]; y < sectors[k][3]; y++) {
				if (board[x][y] === "") {
					sectInfo.push([x, y, new Set(vset)]);
				}
			}
		}
		for (let m = 0; m < sectInfo.length; m++) {
			let sin = sectInfo[m];
			let rowv = new Set();
			for (let y = 0; y < 9; y++) {
				rowv.add(board[sin[0]][y]);
			}
			let left = new Set([...sin[2]].filter((x) => !rowv.has(x)));
			let colv = new Set();
			for (let x = 0; x < 9; x++) {
				colv.add(board[x][sin[1]]);
			}
			left = new Set([...left].filter((x) => !rowv.has(x)));
			if (left.length === 1) {
				let val = left.pop();
				if (isValid(board, sin[0], sin[1], val)) {
					board[sin[0]][sin[1]] = val;
					impl.append([sin[0], sin[1], val]);
				}
			}
		}
	}
	return impl;
}

function undoImplications(board, impl) {
	for (let i = 0; i < impl.length; i++) {
		board[impl[i][0]][impl[i][1]] = "";
	}
}

function isValid(board, i, j, num) {
	const rowOk = !board[i].includes(num);
	if (rowOk) {
		const columnOk = checkCol(board, j, num);
		if (columnOk) {
			const boxOk = checkBox(board, i - (i % 3), j - (j % 3), num);
			if (boxOk) return true;
		}
	}

	return false;
}

function checkCol(board, j, num) {
	for (let i = 0; i < 9; i++) {
		if (board[i][j] === num) return false;
	}
	return true;
}

function checkBox(board, startRow, startCol, num) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[startRow + i][startCol + j] === num) return false;
		}
	}
	return true;
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
	return Math.round(Math.random() * 8) + 1;
}

export function generateRandomIdx() {
	return Math.round(Math.random() * 8);
}

export function trimSolution(solution, n) {
	const board = JSON.parse(JSON.stringify(solution));

	for (let i = 0; i < n; i++) {
		const row = generateRandomIdx();
		const col = generateRandomIdx();
		if (!board[row][col]) i--;
		else board[row][col] = "";
	}
	return board;
}

export function createSudokuBoard() {
	let board = new Array(9);
	for (var i = 0; i < 9; i++) {
		board[i] = new Array(9).fill("");
	}

	fillSquares(board);
	return board;
}

function fillSquares(board) {
	function fillOneSquare(startRow, startCol) {
		const nums = new Set(numbers);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const num = generateRandomNum();
				if (nums.has(num)) {
					board[startRow + i][startCol + j] = num;
					nums.delete(num);
				} else {
					j--;
				}
			}
		}
	}
	fillOneSquare(0, 0);
	fillOneSquare(3, 3);
	fillOneSquare(6, 6);
}

// __________________ OLD CODE __________________

// row, column, and box check

//  function createSudokuSolution() {
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

// function boardComplete(board) {
// 	const allNums = board.every((row, i) => {
// 		return row.every((entry) => typeof entry === "number");
// 	});

// 	return allNums;
// }

// POSSIBLE NUMS
// function assignPossibleNums(board) {
// 	for (let i = 0; i < 9; i++) {
// 		for (let j = 0; j < 9; j++) {
// 			if (typeof board[i][j] !== "number") {
// 				board[i][j] = findPossibleNums(board, i, j);
// 			}
// 		}
// 	}
// 	  return board
// }

// function findPossibleNums(board, row, col) {
// 	let possibleNums = new Set(numbers);
// 	possibleByRow(board, possibleNums, row);
// 	possibleByCol(board, possibleNums, col);
// 	possibleByBox(board, possibleNums, row - (row % 3), col - (col % 3));

// 	return possibleNums;
// }

// function possibleByRow(board, nums, row) {
// 	board[row].forEach((entry) => {
// 		if (typeof entry === "number") {
// 			nums.delete(entry);
// 		}
// 		if (nums.size === 1) return nums;
// 	});
// 	return nums;
// }

// function possibleByCol(board, nums, col) {
// 	for (let i = 0; i < 9; i++) {
// 		let entry = board[i][col];
// 		if (typeof entry === "number") {
// 			nums.delete(entry);
// 		}
// 		if (nums.size === 1) return nums;
// 	}
// 	return nums;
// }

// function possibleByBox(board, nums, boxStartRow, boxStartCol) {
// 	for (let i = 0; i < 3; i++) {
// 		for (let j = 0; j < 3; j++) {
// 			let entry = board[boxStartRow + i][boxStartCol + j];
// 			if (typeof entry === "number") {
// 				nums.delete(entry);
// 			}
// 			if (nums.size === 1) return nums;
// 		}
// 	}
// 	return nums;
// }

// // EXACT NUM
// function assignExactNum(board) {
// 	for (let i = 0; i < 9; i++) {
// 		for (let j = 0; j < 9; j++) {
// 			if (typeof board[i][j] !== "number") {
// 				let exactNum = findExactNum(board, i, j);
// 				if (exactNum) {
// 					board[i][j] = exactNum;
// 				}
// 			}
// 		}
// 	}
// }

// function findExactNum(board, row, col) {
// 	let exactNums = new Set(numbers);

// 	exactByRow(board, exactNums, row);

// 	if (!exactNums.size) {
// 		exactByCol(board, (exactNums = new Set(numbers)), col);
// 	} else if (!exactNums.size) {
// 		exactByBox(
// 			board,
// 			(exactNums = new Set(numbers)),
// 			row - (row % 3),
// 			col - (col % 3)
// 		);
// 	}
// 	console.log(exactNums);

// 	if (exactNums.size === 1) return [...exactNums][0];
// 	else return false;
// }

// function exactByRow(board, nums, row) {
// 	board[row].forEach((entry) => {
// 		deleteEntry(nums, entry);
// 		if (nums.size === 1) return nums;
// 	});
// 	return nums;
// }

// function exactByCol(board, nums, col) {
// 	for (let i = 0; i < 9; i++) {
// 		let entry = board[i][col];
// 		deleteEntry(nums, entry);
// 		if (nums.size === 1) return nums;
// 	}
// 	return nums;
// }

// function exactByBox(board, nums, boxStartRow, boxStartCol) {
// 	for (let i = 0; i < 3; i++) {
// 		for (let j = 0; j < 3; j++) {
// 			let entry = board[boxStartRow + i][boxStartCol + j];
// 			deleteEntry(nums, entry);
// 			if (nums.size === 1) return nums;
// 		}
// 	}
// 	return nums;
// }

// function deleteEntry(nums, entry) {
// 	if (typeof entry === "number") {
// 		nums.delete(entry);
// 	} else if (typeof entry === "object") {
// 		[...entry].forEach((num) => nums.delete(num));
// 	}
// }

// function checkRows(board) {
// 	board.every((row) => {
// 		let check = new Set(numbers);
// 		row.every((num) => {
// 			check.delete(num);
// 		});
// 		if (check.length) return false;
// 	});

// 	return true;
// }

// function checkCols(board) {
// 	board.every((row, i) => {
// 		let check = new Set(numbers);
// 		row.every((num, j) => {
// 			check.delete(board[i][j]);
// 		});
// 		if (check.length) return false;
// 	});

// 	return true;
// }
