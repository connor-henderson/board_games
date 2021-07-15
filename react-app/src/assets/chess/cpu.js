import getValidMoves from "./moves";

export default function getCPUMove(board, team, teamOnTop) {
	const pieces = [];
	board.forEach((row, i) =>
		row.forEach((square, j) => {
			if (square.team === team) {
				pieces.push([square, i, j, `${i} ${j}`]);
			}
		})
	);

	const validMoves = [];
	for (let i = 0; i < pieces.length; i++) {
		let moves = getValidMoves(
			board,
			pieces[i][0],
			pieces[i][1],
			pieces[i][2],
			teamOnTop
		);
		for (let j = 0; j < moves.length; j++) {
			validMoves.push([pieces[i][3], moves[j]]);
			const [row, col] = moves[j].split(" ");
			if (board[row][col] && board[row][col].team !== team) {
				return [pieces[i][3], moves[j], validMoves];
			}
		}
	}

	const numMoves = validMoves.length < 1 ? 0 : validMoves.length - 1;
	const randIdx = Math.floor(Math.random() * numMoves);
	console.log(validMoves, randIdx);
	return [...validMoves[randIdx], validMoves];
}
