import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import pieces, {
	blackTopRow,
	blackBottomRow,
	middleRows,
	whiteTopRow,
	whiteBottomRow,
} from "../../assets/chess/piecesInfo";
import { getValidMoves, getCPUMove } from "../../assets/chess/moveFunctions";
import "./Chess.css";

const Chess = () => {
	const [CPU, setCPU] = useState(0);
	const [points, setPoints] = useState(0);
	const user = useSelector((state) => state.session.user);
	const score = useSelector((state) => state.session.user.chess_score);
	const dispatch = useDispatch();
	const [CPUColor, setCPUColor] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [validMoves, setValidMoves] = useState(["0 0"]);
	const [turn, setTurn] = useState("white");
	const [board, setBoard] = useState([[]]);
	const [whiteLostPieces, setWhiteLostPieces] = useState([]);
	const [blackLostPieces, setBlackLostPieces] = useState([]);
	const [teamOnTop, setTeamOnTop] = useState("black");
	const [CPUThoughts, setCPUThoughts] = useState(false);
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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!winner || !CPU || winner === CPUColor) return;
		dispatch(updateUserScore(user.id, "chess", points));
	}, [winner, CPU, CPUColor, dispatch, user.id, points]);

	useEffect(() => {
		if (!CPU || CPUColor !== turn) return;
		const [prevPos, nextPos, validMoves] = getCPUMove(
			board,
			CPUColor,
			teamOnTop
		);
		if (CPUThoughts) animateCPUThoughts(prevPos, nextPos, validMoves);
		else animateCPUMove(prevPos, nextPos, validMoves);
		return null;
	}, [turn, CPUColor, teamOnTop, CPU, board]); // eslint-disable-line react-hooks/exhaustive-deps

	function newGame() {
		const clicked = document.querySelector(".--clicked");
		if (clicked) {
			clicked.classList.remove("--clicked");
		}
		let nextBoard;
		if (teamOnTop === "black") {
			nextBoard = JSON.parse(JSON.stringify(blackOnTopBoard));
		} else {
			nextBoard = JSON.parse(JSON.stringify(whiteOnTopBoard));
		}
		setTurn("white");
		setBoard(nextBoard);
		setWinner(false);
		setBlackLostPieces([]);
		setWhiteLostPieces([]);
	}

	function makeMove(board, prevPos, nextPos) {
		const [prevRow, prevCol] = prevPos.split(" ");
		const prevPiece = board[prevRow][prevCol];
		const [nextRow, nextCol] = nextPos.split(" ");

		const pieceTaken = board[nextRow][nextCol];

		if (pieceTaken.team === "white")
			setWhiteLostPieces(whiteLostPieces.concat(pieceTaken));
		if (pieceTaken.team === "black")
			setBlackLostPieces(blackLostPieces.concat(pieceTaken));
		if (pieceTaken.name === "king") setWinner(turn);
		if (prevPiece.name === "pawn" && (+nextRow === 0 || +nextRow === 7)) {
			if (prevPiece.team === "black") {
				board[nextRow][nextCol] = pieces.queenB;
			} else {
				board[nextRow][nextCol] = pieces.queenW;
			}
		} else {
			board[nextRow][nextCol] = prevPiece;
		}

		board[prevRow][prevCol] = "";
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

	function configureCPU(e) {
		setCPU(+e.target.value);
		setPoints(+e.target.value ? 70 : 0);
		setCPUColor(+e.target.value ? turn : "");
	}

	function animateCPUThoughts(prevPos, nextPos, validMoves) {
		for (let i = 0; i < validMoves.length; i++) {
			const [prevRow, prevCol] = validMoves[i][0].split(" ");
			const [nextRow, nextCol] = validMoves[i][1].split(" ");
			const prevEle = document.querySelector(
				`.row-${prevRow}.col-${prevCol}`
			);
			const nextEle = document.querySelector(
				`.row-${nextRow}.col-${nextCol}`
			);
			setTimeout(() => {
				prevEle.classList.add("--clicked", `${i}`);
				nextEle.classList.add("--clicked", `${i}`);
			}, 100 * i);
			setTimeout(() => {
				prevEle.classList.remove("--clicked");
				nextEle.classList.remove("--clicked");
			}, 100 * i + 100);
		}
		setTimeout(
			() => animateCPUMove(prevPos, nextPos),
			validMoves.length * 100 + 100
		);
	}

	function animateCPUMove(prevPos, nextPos) {
		const [prevRow, prevCol] = prevPos.split(" ");
		const [nextRow, nextCol] = nextPos.split(" ");
		const prevEle = document.querySelector(
			`.row-${prevRow}.col-${prevCol}`
		);
		const nextEle = document.querySelector(
			`.row-${nextRow}.col-${nextCol}`
		);
		setTimeout(() => prevEle.classList.add("--clicked"), 400);
		setTimeout(() => {
			prevEle.classList.remove("--clicked");
			nextEle.classList.add("--clicked");
		}, 800);
		setTimeout(() => {
			nextEle.classList.remove("--clicked");
			makeMove(board, prevPos, nextPos);
			setTurn(turn === "black" ? "white" : "black");
		}, 1200);
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
		<div className="chess-container">
			<div className="chess game">
				<div className="win-message chess">
					{winner && `${winner} wins!`}
				</div>
				<div className="game-nav chess">
					<div className="chess-score">
						<div className="chess-score">Your score: {score}</div>
						<div className="chess-points">
							Points to win: {points}
						</div>
					</div>
					<div className="chess-toggle">
						<button onClick={newGame}>New Game</button>
						<button onClick={flipBoard}>Flip</button>
						<div className="cpu">
							<label className="cpu" htmlFor="cpu">
								CPU {+CPU ? CPUColor : ""}
							</label>
							<input
								type="range"
								className="cpu-slider"
								name="cpu"
								max="1"
								min="0"
								value={CPU}
								onChange={configureCPU}
								step="1"
							></input>
						</div>
						{CPU > 0 && (
							<>
								<label htmlFor="show">
									Show Considered Moves
								</label>
								<input
									type="checkbox"
									name="show"
									onChange={() =>
										setCPUThoughts(!CPUThoughts)
									}
									value={CPUThoughts}
								></input>
							</>
						)}
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
		</div>
	);
};

export default Chess;
