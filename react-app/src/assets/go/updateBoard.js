export default function updateBoard(board) {
	return board.map((row, i) =>
		row.map((square, j) => {
			if (square === "x" || square === "c") return "x";
			else if (square === "") {
				const emptyHasLiberty = checkEmptyLiberty(board, i, j);
				if (emptyHasLiberty) return square;
				return "x";
			} else {
				const stoneHasLiberty = checkStoneLiberty(board, i, j);
				if (stoneHasLiberty) return square;
				return "c";
			}
		})
	);
}

function getNeighbors(board, i, j) {
	if (board[i][j] === undefined) return [];

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
	return neighbors;
}

// recursive solution for stones
function checkStoneLiberty(board, i, j, visited = []) {
	if (board[i][j] === "") return true;
	if (visited.includes(`${i} ${j}`)) return;
	visited.push(`${i} ${j}`);

	const neighbors = getNeighbors(board, i, j);
	const validNeighbors = neighbors.filter(
		(square) => square.team === board[i][j] || square.team === ""
	);
	const neighborsWithLiberty = validNeighbors.filter((square) =>
		checkStoneLiberty(board, square.row, square.col, visited)
	);

	return neighborsWithLiberty.length > 0;
}

// recursive solution for empty squares
function checkEmptyLiberty(board, i, j) {
	return true;
}
