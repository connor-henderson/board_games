// NEW
// if a square is empty, fan out and check if you can possibly find more than one color stone
// if you can't, mark it as a territory for the one color

// Show Score and Show Territories only on click
// You CAN play back into territory

// OLD
// on click move in opposite directions on the borders
// if you encounter anything other than your team stone or empty space, return
// if you encounter 1 or more spaces and then your team stone
// pick an empty square in between them and call an iterative check for opponent stones
// if you do not find one, return true

export default function updateBoard(board) {
	// update all squares except the most recently placed square, unless its a ko
	const nextBoard = board.map((row, i) =>
		row.map((square, j) => {
			if (square.includes("p")) return square.replace("p", "");
			else if (square === "wx" || square === "wc") return "wx";
			else if (square === "bx" || square === "bc") return "bx";
			else if (square.includes("ko")) return "";
			else if (square) {
				return stoneStatus(board, i, j);
			} else return "";
		})
	);

	return nextBoard;
}

function markEmptySquares(board, liberties, currentTeam) {
	const opponentTeam = currentTeam === "b" ? "w" : "b";
	liberties.forEach((square) => {
		const [row, col] = square.split(" ");
		board[row][col] = opponentTeam + "x";
	});
}

export function updateClickedSquare(board, i, j, turn) {
	// if there is already input at this square, it can't be played
	if (board[i][j]) return false;

	let nextBoard = JSON.parse(JSON.stringify(board));
	const currentTeam = turn === "black" ? "b" : "w";
	const opponentTeam = currentTeam === "b" ? "w" : "b";
	nextBoard[i][j] = currentTeam + "p";
	nextBoard = updateBoard(nextBoard, i, j);

	const nextNeighbors = getNeighbors(nextBoard, i, j);
	const liberties = nextNeighbors.filter(
		(neighbor) =>
			!neighbor.team.includes(opponentTeam) &&
			!neighbor.team.includes("c")
	);

	// if the stone would still not have liberties or captures after being updated with priority, do not allow the move
	if (!liberties.length) return false;
	else return nextBoard;
}

function stoneStatus(board, i, j) {
	const [isKo, team] = checkIfKo(board, i, j);
	const neighborIsKo = checkNeighborIsKo(board, i, j);

	if (isKo) return `ko-${team}`;
	else if (neighborIsKo) return board[i][j];
	else {
		const stoneHasLiberty = checkStoneLibertyIterative(board, i, j);
		if (stoneHasLiberty) return board[i][j];
		const oppositeTeam = board[i][j] === "b" ? "w" : "b";
		return oppositeTeam + "c";
	}
}

function getNeighbors(board, i, j) {
	const neighbors = [
		{ "team": board[i][j - 1], "row": i, "col": j - 1 },
		{ "team": board[i][j + 1], "row": i, "col": j + 1 },
	];

	if (i > 0 && i < 18) {
		neighbors.push({ "team": board[i - 1][j], "row": i - 1, "col": j });
		neighbors.push({ "team": board[i + 1][j], "row": i + 1, "col": j });
	} else if (i > 0) {
		neighbors.push({ "team": board[i - 1][j], "row": i - 1, "col": j });
	} else {
		neighbors.push({ "team": board[i + 1][j], "row": i + 1, "col": j });
	}
	return neighbors.filter((square) => square.team !== undefined);
}

function checkStoneLibertyIterative(board, i, j) {
	const queue = [{ "team": board[i][j], "row": i, "col": j }];
	const visited = [];
	let count = 0;
	let square;

	while (count < 3 && queue.length) {
		square = queue.shift();

		if (visited.includes(`${square.row} ${square.col}`)) continue;
		visited.push(`${square.row} ${square.col}`);

		if (!square.team) {
			count++;
		}
		const neighbors = getNeighbors(board, square.row, square.col);
		const validNeighbors = neighbors.filter(
			(square) => square.team.includes(board[i][j]) || square.team === ""
		);
		queue.push(...validNeighbors);
	}

	if (count < 2) {
		const liberties = visited.filter((square) => {
			if (square) {
				const [row, col] = square.split(" ");
				return !board[row][col];
			} else return [];
		});
		const currentTeam = board[i][j].replace("p", "");
		markEmptySquares(board, liberties, currentTeam);
		return false;
	}
	if (count > 2) return true;

	const hasTwoEyes = checkForEyes(board, i, j, visited);
	return hasTwoEyes;
}

function checkIfKo(board, i, j) {
	const neighbors = getNeighbors(board, i, j);
	const otherTeam = board[i][j] === "b" ? "w" : "b";
	const isKo = neighbors.every(
		(square) =>
			square.team.includes(otherTeam) && !square.team.includes("x")
	);
	return [isKo, otherTeam];
}

function checkNeighborIsKo(board, i, j) {
	const neighbors = getNeighbors(board, i, j);
	return !neighbors.every((square) => !square.team.includes("ko"));
}

function checkForEyes(board, i, j, visited) {
	const currentTeam = board[i][j].replace("p", "");
	const liberties = visited.filter((square) => {
		if (square) {
			const [row, col] = square.split(" ");
			return !board[row][col];
		} else return [];
	});

	const [liberty1, liberty2] = [liberties[0], liberties[1]];
	const [l1row, l1col] = liberty1.split(" ");
	const [l2row, l2col] = liberty2.split(" ");
	// if there are two liberties that are on the same row or column, check further
	if (l1row === l2row) {
		// move across from one liberty to the other, and if you don't encounter an empty space or your team it's toast
		const start = l1col < l2col ? +l1col : +l2col;
		const finish = l1col < l2col ? +l2col : +l1col;
		for (let k = start + 1; k < finish; k++) {
			const inBetweenSquare = board[l1row][k].replace("p", "");
			if (inBetweenSquare === "") return true;
			if (inBetweenSquare === board[i][j]) return true;
		}
		markEmptySquares(board, liberties, currentTeam);
		return false;
	} else if (l1col === l2col) {
		// move across from one liberty to the other, and if you don't encounter an empty space or your team it's toast
		const start = l1row < l2row ? +l1row : +l2row;
		const finish = l1row < l2row ? +l2row : +l1row;
		for (let k = start + 1; k < finish; k++) {
			const inBetweenSquare = board[k][l1col].replace("p", "");
			if (inBetweenSquare === "") return true;
			if (inBetweenSquare === board[i][j]) return true;
		}
		markEmptySquares(board, liberties, currentTeam);
		return false;
	}
}

export function fillRandomBoard() {
	const newBoard = new Array(19)
		.fill([])
		.map((row) => new Array(19).fill(""));

	// fill white stones
	for (let i = 0; i < 80; i++) {
		const randomRow = Math.floor(Math.random() * 18);
		const randomCol = Math.floor(Math.random() * 18);
		if (newBoard[randomRow][randomCol]) i--;
		else newBoard[randomRow][randomCol] = "w";
	}

	// fill black stones
	for (let i = 0; i < 80; i++) {
		const randomRow = Math.floor(Math.random() * 18);
		const randomCol = Math.floor(Math.random() * 18);
		if (newBoard[randomRow][randomCol]) i--;
		else newBoard[randomRow][randomCol] = "b";
	}

	// update the new board
	const updatedBoard = updateBoard(newBoard);
	return updatedBoard;
}
