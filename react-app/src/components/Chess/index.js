import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import pieces, {
	blackTopRow,
	blackBottomRow,
	middleRows,
	whiteTopRow,
	whiteBottomRow,
	whiteTeam,
	blackTeam,
} from "../../assets/chess/piecesInfo";
import { getValidMoves, makeMove } from "../../assets/chess/moveFunctions";
import "./Chess.css";

const Chess = () => {
	const [CPU, setCPU] = useState(false);
	const [points, setPoints] = useState(0);
	const user = useSelector((state) => state.session.user);
	const score = useSelector((state) => state.session.user.chess_score);
	const dispatch = useDispatch();
	const [clicked, setClicked] = useState(false);
	const [validMoves, setValidMoves] = useState(["0 0"]);
	const [turn, setTurn] = useState("white");
	const [board, setBoard] = useState([[]]);
	const [whiteLostPieces, setWhiteLostPieces] = useState([]);
	const [blackLostPieces, setBlackLostPieces] = useState([]);
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
	}, []);

	useEffect(() => {
		if (!winner || !CPU || winner === CPU) return;

		dispatch(updateUserScore(user.id, "chess", points));
	}, [winner]);

	useEffect(() => {
		setPoints(CPU ? 70 : 0);
	}, [CPU]);

	function newGame() {
		const clicked = document.querySelector(".--clicked");
		if (clicked) {
			clicked.classList.remove("--clicked");
		}
		if (teamOnTop === "black") {
			var nextBoard = JSON.parse(JSON.stringify(blackOnTopBoard));
		} else {
			var nextBoard = JSON.parse(JSON.stringify(whiteOnTopBoard));
		}
		setTurn("white");
		setBoard(nextBoard);
		setWinner(false);
		setBlackLostPieces([]);
		setWhiteLostPieces([]);
	}

	function makeMove(board, previousPosition, nextPosition) {
		const [previousRow, previousCol] = previousPosition.split(" ");
		const previousPiece = board[previousRow][previousCol];
		const [nextRow, nextCol] = nextPosition.split(" ");

		const pieceTaken = board[nextRow][nextCol];

		if (pieceTaken.team === "white")
			setWhiteLostPieces(whiteLostPieces.concat(pieceTaken));
		if (pieceTaken.team === "black")
			setBlackLostPieces(blackLostPieces.concat(pieceTaken));
		if (pieceTaken.name === "king") setWinner(turn);
		if (previousPiece.name === "pawn" && (nextRow == 0 || nextRow == 7)) {
			if (previousPiece.team === "black") {
				board[nextRow][nextCol] = pieces.queenB;
			} else {
				board[nextRow][nextCol] = pieces.queenW;
			}
		} else {
			board[nextRow][nextCol] = previousPiece;
		}

		board[previousRow][previousCol] = "";
	}

	function flipBoard() {
		setTeamOnTop(teamOnTop === "white" ? "black" : "white");
		const clickedSquare = document.querySelector(".--clicked");
		if (clickedSquare) {
			clickedSquare.classList.remove("--clicked");
			setClicked(false);
		}

		const flippedBoard = JSON.parse(JSON.stringify(board));
		flippedBoard.reverse();
		flippedBoard.map((row) => row.reverse());

		setBoard(flippedBoard);
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
			setClicked(false);
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
		<div className="chess game">
			{winner && `${winner} wins`}
			<div className="game-nav chess">
				<div className="chess-score">
					<div className="chess-score">Your score: {score}</div>
					<div className="chess-points">Points to win: {points}</div>
				</div>
				<div className="chess-toggle">
					<button onClick={newGame}>New Game</button>
					<button onClick={flipBoard}>Flip</button>
					<button
						className="cpu-option"
						onClick={() => setCPU(CPU ? false : turn)}
					>
						{CPU ? "Turn off CPU" : "Play vs CPU"}
					</button>
				</div>
			</div>
			<div className="chess-pieces">
				<div className="white lost-pieces">
					{whiteLostPieces.map((piece, j) => (
						<img
							className="lost-piece"
							key={j}
							src={piece.image}
							alt={piece.name}
						/>
					))}
				</div>
				<div className="black lost-pieces">
					{blackLostPieces.map((piece, i) => (
						<img
							className="lost-piece"
							key={i}
							src={piece.image}
							alt={piece.name}
						/>
					))}
				</div>
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
												? `row-${i} col-${j} chess dark`
												: `row-${i} col-${j} chess light`
										}
										onClick={handleClick}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										{board[i][j].image && (
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
		</div>
	);
};

export default Chess;
