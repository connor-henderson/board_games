export default function updateBoard(board, placedRow, placedColumn) {
	// update all squares except the most recently placed square, unless its a ko
	return board.map((row, i) =>
		row.map((square, j) => {
			if (square.includes("p")) return square.replace("p", "");
			else if (square === "wx" || square === "wc") return "wx";
			else if (square === "bx" || square === "bc") return "bx";
			else if (square === "ko") return "";
			else if (square) {
				return stoneStatus(board, i, j);
			} else return "";
		})
	);
}

function checkIfTerritory(board, i, j) {
	const neighbors = getNeighbors(board, i, j);
	const surrounded = neighbors.every(
		(square) => square.team.includes("x") || square.team.includes("c")
	);
	if (surrounded) return neighbors[0].replace(/c?/, "");
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

	// we have a problem when we update a clicked square because it updates all squares.
	// why is this a problem? shouldn't the update function work properly?
	// we only want to update all squares if checking the stoneStatus of the current square would result in a capture

	// make two copies of the board: one simulate updating the board at this position and one for updating
	let nextBoard = JSON.parse(JSON.stringify(board));
	const currentTeam = turn === "black" ? "b" : "w";
	const opponentTeam = currentTeam === "b" ? "w" : "b";

	nextBoard[i][j] = currentTeam + "p";
	console.log("previousBoard", nextBoard);
	nextBoard = updateBoard(nextBoard, i, j);
	console.log("nextBoard", nextBoard);

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
	const isKo = checkIfKo(board, i, j);
	const neighborIsKo = checkNeighborIsKo(board, i, j);

	if (isKo) return "ko";
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

	if (count < 2) return false;
	if (count > 2) return true;

	const hasTwoEyes = checkForEyes(board, i, j, visited);
	return hasTwoEyes;
}

function checkIfKo(board, i, j) {
	const neighbors = getNeighbors(board, i, j);
	const otherTeam = board[i][j] === "b" ? "w" : "b";
	return neighbors.every(
		(square) =>
			square.team.includes(otherTeam) && !square.team.includes("x")
	);
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
		}
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

// ---------- OLD CODE ----------

// recursive solution for stones
function checkStoneLibertyRecursive(board, i, j, visited = [], count = 0) {
	if (visited.includes(`${i} ${j}`)) return;
	visited.push(`${i} ${j}`);

	if (board[i][j] === "") {
		count += 1;
	}
	if (count > 2) return true;
	console.log(visited);

	const neighbors = getNeighbors(board, i, j);
	const validNeighbors = neighbors.filter(
		(square) => square.team === board[i][j] || square.team === ""
	);

	const valid = validNeighbors.map((square) =>
		checkStoneLibertyRecursive(
			board,
			square.row,
			square.col,
			visited,
			count
		)
	);

	if (count < 2) {
		console.log(" --- NEW COUNT");
		visited.forEach((square) => {
			const [row, col] = [square.split(" ")[0], square.split(" ")[1]];
			console.log(board[row][col] === "", row, col);
		});
		// console.log(visited, count);
	}
	if (count > 2) return true;

	// const hasTwoEyes = checkForEyes(board, i, j, visited);
	return true;
}
