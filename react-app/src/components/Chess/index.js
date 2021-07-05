import React, { useState, useEffect } from "react";
import pieces, {
	blackTopRow,
	blackBottomRow,
	middleRows,
	whiteTopRow,
	whiteBottomRow,
} from "../../assets/chess/piecesInfo";
import { getValidMoves, makeMove } from "../../assets/chess/moveFunctions";
import "./Chess.css";

const Chess = () => {
	const [clicked, setClicked] = useState(false);
	const [validMoves, setValidMoves] = useState(["0 0"]);
	const [turn, setTurn] = useState("white");
	const [board, setBoard] = useState([[]]);
	const [teamOnTop, setTeamOnTop] = useState("black");
	const [winner, setWinner] = useState(false);
	const blackOnTopBoard = [
		blackTopRow,
		new Array(8).fill(pieces.pawnB),
		...middleRows,
		new Array(8).fill(pieces.pawnW),
		whiteBottomRow,
	];
	const whiteOnTopBoard = [
		whiteTopRow,
		new Array(8).fill(pieces.pawnW),
		...middleRows,
		new Array(8).fill(pieces.pawnB),
		blackBottomRow,
	];

	useEffect(() => {
		newGame();
	}, [teamOnTop]);

	useEffect(() => {
		if (winner) {
			console.log(winner, "wins!");
		}
	}, [winner]);

	function newGame() {
		const clicked = document.querySelector(".--clicked");
		if (clicked) {
			clicked.classList.remove("--clicked");
		}

		if (teamOnTop === "black") {
			setBoard(blackOnTopBoard);
		} else {
			setBoard(whiteOnTopBoard);
		}
	}

	function makeMove(board, previousPosition, nextPosition) {
		const [previousRow, previousCol] = previousPosition.split(" ");
		const [nextRow, nextCol] = nextPosition.split(" ");

		if (board[nextRow][nextCol].name === "king") {
			setWinner(turn);
		}

		board[nextRow][nextCol] = board[previousRow][previousCol];
		board[previousRow][previousCol] = "";
	}

	function handleClick(e) {
		// always get the parent td element
		let square = e.target;
		if (e.target.className === "piece-image") {
			square = e.target.parentNode;
		}

		// retrieve the row, col numbers from the target's class
		const [row, col] = square.classList;
		const [rowNum, colNum] = [
			parseInt(row.slice(4, 6), 10),
			parseInt(col.slice(4, 6), 10),
		];

		// handle clicks that are to make a move and remove previous clicks
		const previouslyClicked = document.querySelector(".--clicked");
		if (previouslyClicked) {
			previouslyClicked.classList.remove("--clicked");
			setValidMoves([]);
			const nextSquare = `${rowNum} ${colNum}`;
			if (validMoves.includes(nextSquare)) {
				makeMove(board, clicked, nextSquare);
				if (turn === "white") return setTurn("black");
				else if (turn === "black") return setTurn("white");
			}
		}

		// if the current square is not the current player's piece, return
		if (board[rowNum][colNum].team !== turn) return;

		// if the current square is the current player's piece and they are not making a move, reset clicked and the valid moves
		square.classList.add("--clicked");
		setClicked(`${rowNum} ${colNum}`);

		const newValidMoves = getValidMoves(
			board,
			board[rowNum][colNum],
			rowNum,
			colNum,
			teamOnTop
		);
		console.log(newValidMoves);
		setValidMoves(newValidMoves);
	}

	function handleMouseEnter(e) {
		// always get the parent td element
		let square = e.target;
		if (e.target.className === "piece-image") {
			square = e.target.parentNode;
		}

		const [row, col] = square.classList;
		const [rowNum, colNum] = [
			parseInt(row.slice(4, 6), 10),
			parseInt(col.slice(4, 6), 10),
		];

		if (validMoves.includes(`${rowNum} ${colNum}`)) {
			square.classList.add("valid-move");
		}
	}

	function handleMouseLeave(e) {
		// always get the parent td element
		let square = e.target;
		if (e.target.className === "piece-image") {
			square = e.target.parentNode;
		}

		square.classList.remove("valid-move");
	}

	return (
		<>
			<div className="chess-toggle">
				<button
					onClick={
						teamOnTop === "black"
							? () => setTeamOnTop("white")
							: () => setTeamOnTop("black")
					}
				>
					Flip
				</button>
			</div>
			<table className="chess">
				<tbody className="chess">
					{board.map((row, i) => (
						<tr key={i} className={i}>
							{row.map((square, j) => {
								return (
									<td
										key={j}
										className={
											(i + j) % 2
												? `row-${i} col-${j} chess light`
												: `row-${i} col-${j} chess dark`
										}
										onClick={handleClick}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										{board[i][j].image !== undefined && (
											<img
												className="piece-image"
												src={board[i][j].image}
												alt={`${board[i][j].team} ${board[i][j].name}`}
											/>
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Chess;
