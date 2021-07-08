export function glider(universe) {
	const newUniverse = JSON.parse(JSON.stringify(universe));
	const middleRow = Math.floor(newUniverse.length / 2);
	const middleCol = Math.floor(newUniverse[0].length / 2);

	newUniverse[middleRow][middleCol] = true;
	newUniverse[middleRow + 1][middleCol + 1] = true;
	newUniverse[middleRow + 2][middleCol - 1] = true;
	newUniverse[middleRow + 2][middleCol] = true;
	newUniverse[middleRow + 2][middleCol + 1] = true;

	return newUniverse;
}

export function presetBoard(board) {
	const newBoard = JSON.parse(JSON.stringify(board));
	const middleRow = Math.floor(board.length / 2);
	const middleCol = Math.floor(board[0].length / 2);

	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;
	newBoard[middleRow][middleCol] = true;

	return newBoard;
}
