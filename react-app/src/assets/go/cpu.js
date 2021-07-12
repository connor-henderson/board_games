import { updateClickedSquare, getNeighbors } from "./updateBoard";

export default function getCPUMove(board, CPUColor, validMoves = []) {
	// return [nextBoard, chosenMove, validMoves]
	if (!validMoves.length) {
		const opponentStones = getOpponentStones(board, CPUColor);
		opponentStones.forEach((pos) => {
			const neighborsPlus = getNeighborsPlus(board, pos[0], pos[1]);
			neighborsPlus.forEach((sqr) => {
				const move = `${sqr.row} ${sqr.col}`;
				if (!sqr.team && !validMoves.includes(move))
					validMoves.push(move);
			});
		});
	}

	let nextBoard;
	if (validMoves.length > 4) {
		const randIdx = Math.floor(Math.random() * (validMoves.length - 1));
		const [randRow, randCol] = validMoves[randIdx].split(" ");
		nextBoard = updateClickedSquare(board, randRow, randCol, CPUColor);
		if (!nextBoard) return getCPUMove(board, CPUColor, validMoves);
		else return [nextBoard, `${randRow} ${randCol}`, validMoves];
	} else {
		const randRow = Math.floor(Math.random() * board[0].length);
		const randCol = Math.floor(Math.random() * board.length);
		nextBoard = updateClickedSquare(board, randRow, randCol, CPUColor);
		if (!nextBoard) return getCPUMove(board, CPUColor, validMoves);
		else return [nextBoard, `${randRow} ${randCol}`, validMoves];
	}
}

function getOpponentStones(board, CPUColor) {
	const opponentTeam = CPUColor === "white" ? "b" : "w";
	const opponentStones = [];
	board.forEach((row, i) =>
		row.forEach((sqr, j) => {
			if (sqr === opponentTeam) {
				opponentStones.push([i, j]);
			}
		})
	);
	return opponentStones;
}

function getNeighborsPlus(board, i, j) {
	let neighborsPlus = [];
	const firstNeighbors = getNeighbors(board, +i, +j);
	firstNeighbors.forEach((sqr) => {
		neighborsPlus.push(sqr);
		neighborsPlus = neighborsPlus.concat(
			getNeighbors(board, sqr.row, sqr.col)
		);
	});

	return neighborsPlus;
}
