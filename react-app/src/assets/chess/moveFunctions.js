export function getValidMoves(board, piece, row, col, teamOnTop) {
	let validMoves = [];

	if (piece.name === "pawn") {
		validMoves = getPawnMoves(board, piece, row, col, teamOnTop);
	} else if (piece.name === "bishop") {
		validMoves = getBishopMoves(board, piece, row, col);
	} else if (piece.name === "knight") {
		validMoves = getKnightMoves(board, piece, row, col);
	} else if (piece.name === "rook") {
		validMoves = getRookMoves(board, piece, row, col);
	} else if (piece.name === "queen") {
		validMoves = getQueenMoves(board, piece, row, col);
	} else {
		validMoves = getKingMoves(board, piece, row, col);
	}

	return validMoves;
}

function getPawnMoves(board, piece, row, col, teamOnTop) {
	const validMoves = [];

	if (teamOnTop === piece.team) {
		for (let i = 1; i < 3; i++) {
			if (board[row + i][col]) break;
			validMoves.push(`${row + i} ${col}`);
		}
		if (board[row + 1][col + 1]) {
			validMoves.push(`${row + 1} ${col + 1}`);
		}
		if (board[row + 1][col - 1]) {
			validMoves.push(`${row + 1} ${col - 1}`);
		}
	} else {
		for (let i = 1; i < 3; i++) {
			if (board[row - i][col]) break;
			validMoves.push(`${row - i} ${col}`);
		}
		if (board[row - 1][col - 1]) {
			validMoves.push(`${row - 1} ${col - 1}`);
		}
		if (board[row - 1][col + 1]) {
			validMoves.push(`${row + 1} ${col + 1}`);
		}
	}

	return validMoves;
}

function getBishopMoves(board, piece, row, col) {
	const validMoves = [];
	let upAndRight = true;
	let upAndLeft = true;
	let downAndRight = true;
	let downAndLeft = true;

	for (let i = 1; i < board.length; i++) {
		if (upAndRight) {
			if (!board[row - i] || board[row - i][col + i] === undefined) {
				upAndRight = false;
			} else {
				const nextPiece = board[row - i][col + i];
				if (nextPiece) {
					upAndRight = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row - i} ${col + i}`);
					}
				} else {
					validMoves.push(`${row - i} ${col + i}`);
				}
			}
		}
		if (upAndLeft) {
			if (!board[row - i] || board[row - i][col - i] === undefined) {
				upAndLeft = false;
			} else {
				const nextPiece = board[row - i][col - i];
				if (nextPiece) {
					upAndLeft = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row - i} ${col - i}`);
					}
				} else {
					validMoves.push(`${row - i} ${col - i}`);
				}
			}
		}
		if (downAndRight) {
			if (!board[row + i] || board[row + i][col + i] === undefined) {
				downAndRight = false;
			} else {
				const nextPiece = board[row + i][col + i];
				if (nextPiece) {
					downAndRight = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row + i} ${col + i}`);
					}
				} else {
					validMoves.push(`${row + i} ${col + i}`);
				}
			}
		}
		if (downAndLeft) {
			if (!board[row + i] || board[row + i][col - i] === undefined) {
				downAndLeft = false;
			} else {
				const nextPiece = board[row + i][col - i];
				if (nextPiece) {
					downAndLeft = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row + i} ${col - i}`);
					}
				} else {
					validMoves.push(`${row + i} ${col - i}`);
				}
			}
		}
	}

	return validMoves;
}

function getKnightMoves(board, piece, row, col) {
	const validMoves = [];
	const possibleMoves = [
		[1, 2],
		[2, 1],
		[-1, 2],
		[-2, 1],
		[2, -1],
		[1, -2],
		[-1, -2],
		[-2, -1],
	];

	possibleMoves.forEach((move) => {
		const [rowDiff, colDiff] = move;
		const [nextRow, nextCol] = [row - rowDiff, col - colDiff];

		if (board[nextRow] && board[nextRow][nextCol] !== undefined) {
			const nextPiece = board[nextRow][nextCol];
			if (!nextPiece || nextPiece.team !== piece.team) {
				validMoves.push(`${nextRow} ${nextCol}`);
			}
		}
	});

	return validMoves;
}

function getRookMoves(board, piece, row, col) {
	const validMoves = [];
	let right = true;
	let left = true;
	let down = true;
	let up = true;

	for (let i = 1; i < board.length; i++) {
		if (right) {
			if (board[row][col + i] === undefined) {
				right = false;
			} else {
				const nextPiece = board[row][col + i];
				if (nextPiece) {
					right = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row} ${col + i}`);
					}
				} else {
					validMoves.push(`${row} ${col + i}`);
				}
			}
		}
		if (left) {
			if (board[row][col - i] === undefined) {
				left = false;
			} else {
				const nextPiece = board[row][col - i];
				if (nextPiece) {
					left = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row} ${col - i}`);
					}
				} else {
					validMoves.push(`${row} ${col - i}`);
				}
			}
		}
		if (down) {
			if (!board[row + i] || board[row + i][col] === undefined) {
				down = false;
			} else {
				const nextPiece = board[row + i][col];
				if (nextPiece) {
					down = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row + i} ${col}`);
					}
				} else {
					validMoves.push(`${row + i} ${col}`);
				}
			}
		}
		if (up) {
			if (!board[row - i] || board[row - i][col] === undefined) {
				up = false;
			} else {
				const nextPiece = board[row - i][col];
				if (nextPiece) {
					up = false;
					if (piece.team !== nextPiece.team) {
						validMoves.push(`${row - i} ${col}`);
					}
				} else {
					validMoves.push(`${row - i} ${col}`);
				}
			}
		}
	}

	return validMoves;
}

function getQueenMoves(board, piece, row, col) {
	const rookMoves = getRookMoves(board, piece, row, col);
	const bishopMoves = getBishopMoves(board, piece, row, col);

	return [...rookMoves, ...bishopMoves];
}

function getKingMoves(board, piece, row, col) {
	const validMoves = [];
	const startRow = row - 1;
	const startCol = col - 1;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (i === 1 && j === 1) continue;

			if (
				board[startRow + i] &&
				board[startRow + i][startCol + j] !== undefined
			) {
				const nextPiece = board[startRow + i][startCol + j];
				if (!nextPiece || nextPiece.team !== piece.team) {
					validMoves.push(`${startRow + i} ${startCol + j}`);
				}
			}
		}
	}

	return validMoves;
}
