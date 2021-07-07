export default function updateBoard(board) {
	return board.map((row, i) =>
		row.map((square, j) => {
			if (square === "x" || square === "c") return "x";
			else if (square.includes("kou")) {
				const turns = parseInt(square.split(":")[1], 10) + 1;
				if (turns === 2) return "";
				else return `kou turns: ${turns}`;
			} else if (square) {
				const isKou = checkIfKou(board, i, j);
				if (isKou) {
					return "kou turns: 0";
				} else {
					const stoneHasLiberty = checkStoneLibertyIterative(
						board,
						i,
						j
					);
					if (stoneHasLiberty) return square;
					return "c";
				}
			} else {
				return "";
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
			(square) => square.team === board[i][j] || square.team === ""
		);
		queue.push(...validNeighbors);
	}

	if (count < 2) return false;
	if (count > 2) return true;

	const hasTwoEyes = checkForEyes(board, i, j, visited);
	return hasTwoEyes;
}

function checkIfKou(board, i, j) {
	const neighbors = getNeighbors(board, i, j);
	const currentTeam = board[i][j];
	const otherTeam = currentTeam === "b" ? "w" : "b";
	return neighbors.every((square) => square.team === otherTeam);
}

function checkForEyes(board, i, j, visited) {
	const liberties = visited.filter((square) => {
		if (square) {
			const [row, col] = square.split(" ");
			return !square[row][col];
		}
	});
	console.log(liberties);

	// const [liberty1, liberty2] = [liberties[0], liberties[1]];
	// const [l1row, l1col] = liberty1.split(" ");
	// const [l2row, l2col] = liberty2.split(" ");
	// // if there are two liberties that are on the same row or column, check further
	// if (l1row === l2row) {
	// 	// move across from one liberty to the other, and if you don't encounter an empty space or your team it's toast
	// 	const start = l1col < l2col ? +l1col : +l2col;
	// 	const finish = l1col < l2col ? +l2col : +l1col;
	// 	for (let k = start + 1; k < finish; k++) {
	// 		const inBetweenSquare = board[l1row][k];
	// 		if (inBetweenSquare === "") return true;
	// 		if (inBetweenSquare === board[i][j]) return true;
	// 	}
	// 	return false;
	// } else if (l1col === l2col) {
	// 	// move across from one liberty to the other, and if you don't encounter an empty space or your team it's toast
	// 	const start = l1row < l2row ? +l1row : +l2row;
	// 	const finish = l1row < l2row ? +l2row : +l1row;
	// 	for (let k = start + 1; k < finish; k++) {
	// 		const inBetweenSquare = board[k][l1col];
	// 		if (inBetweenSquare === "") return true;
	// 		if (inBetweenSquare === board[i][j]) return true;
	// 	}
	// 	return false;
	// }
}
