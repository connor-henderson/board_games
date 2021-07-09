import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import {
	updateClickedSquare,
	fillRandomBoard,
} from "../../assets/go/updateBoard";
import "./Go.css";

const Go = () => {
	// In reference to the board's values:
	// w = white, b = black, wc = stone captured by white, bc = stone captured by white, x = non-playable,
	// "" = playable, "ko-" = ko, "bp"/"wp" = priority, keep on board

	const [board, setBoard] = useState([[]]);
	const [hideTerritories, setHideTerritories] = useState(true);
	const [passes, setPasses] = useState(0);
	const [turn, setTurn] = useState("black");
	const [winner, setWinner] = useState(false);
	const [CPU, setCPU] = useState(false);
	const [points, setPoints] = useState(0);
	const user = useSelector((state) => state.session.user);
	const score = useSelector((state) => state.session.user.go_score);
	const dispatch = useDispatch();

	const [blackCaptures, setBlackCaptures] = useState(0);
	const [blackTerritory, setBlackTerritory] = useState(0);
	const [blackScore, setBlackScore] = useState(0);
	const [whiteCaptures, setWhiteCaptures] = useState(0);
	const [whiteTerritory, setWhiteTerritory] = useState(0);
	const [whiteScore, setWhiteScore] = useState(6.5);

	// end game options

	useEffect(() => {
		newGame();
	}, []);

	useEffect(() => {
		if (!winner || !CPU || winner === CPU) return;

		dispatch(updateUserScore(user.id, "go", points));
	}, [winner, CPU, user.id, points, dispatch]);

	useEffect(() => {
		setPoints(CPU ? 100 : 0);
	}, [CPU]);

	function checkPass() {
		if (passes + 1 > 1) {
			setWinner(blackScore > whiteScore ? "black" : "white");
		}
		setTurn(turn === "black" ? "white" : "black");
		setPasses(passes + 1);
	}

	function newGame() {
		const newBoard = new Array(19)
			.fill([])
			.map((row) => new Array(19).fill(""));
		setTurn("black");
		setBoard(newBoard);
		setWinner(false);
		setBlackScore(0);
		setWhiteScore(6.5);
		setBlackCaptures(0);
		setWhiteCaptures(0);
		setPasses(0);
	}

	function countTerritories(nextBoard) {
		let newBlackTerritory = 0;
		let newWhiteTerritory = 0;

		nextBoard.forEach((row) => {
			row.forEach((square) => {
				if (square === "bx" || square === "bc") newBlackTerritory += 1;
				else if (square === "wx" || square === "wc")
					newWhiteTerritory += 1;
			});
		});

		setBlackTerritory(blackTerritory + newBlackTerritory);
		setWhiteTerritory(whiteTerritory + newWhiteTerritory);
		setBlackScore(blackTerritory - whiteCaptures);
		setWhiteScore(whiteScore + whiteTerritory - blackCaptures);
	}

	function countCaptures(nextBoard) {
		let capturedByBlack = 0;
		let capturedByWhite = 0;

		nextBoard.forEach((row) => {
			row.forEach((square) => {
				if (square === "bc") capturedByBlack += 1;
				else if (square === "wc") capturedByWhite += 1;
				else if (square === "ko-b") capturedByBlack += 1;
				else if (square === "ko-w") capturedByWhite += 1;
			});
		});

		setBlackCaptures(blackCaptures + capturedByBlack);
		setWhiteCaptures(whiteCaptures + capturedByWhite);
	}

	function handleClick(e) {
		// always get the parent td element
		let square = e.target;
		if (e.target.nodeName !== "TD") {
			square = e.target.parentNode;
		}

		// retrieve the row, col numbers from the target's class
		const [row, col] = square.classList;
		const [rowNum, colNum] = [
			parseInt(row.slice(4, 6), 10),
			parseInt(col.slice(4, 6), 10),
		];

		const nextBoard = updateClickedSquare(board, rowNum, colNum, turn);
		if (!nextBoard) return;
		countCaptures(nextBoard);
		// need to account for kou territories at the end of the game
		// need to account for borders
		countTerritories(nextBoard);
		setBoard(nextBoard);
		setPasses(0);
		setTurn(turn === "black" ? "white" : "black");

		return;
	}

	return (
		<div id="go">
			<div className="win-message go">{winner && `${winner} wins!`}</div>
			<div className="game-nav go">
				<div className="white-black-score">
					<div className="black-scores">
						<div id="bscore">Black score {blackScore}</div>
						<div>Territories: {blackTerritory}</div>
						<div>Captures: {blackCaptures}</div>
					</div>
					<div className="white-scores">
						<div id="wscore">White score {whiteScore}</div>
						<div>Territories: {whiteTerritory}</div>
						<div>Captures: {whiteCaptures}</div>
					</div>
				</div>
				<div className="go-score">
					<div className="go-score">Your score: {score}</div>
					<button
						id="hideTerritory"
						onClick={() => setHideTerritories(!hideTerritories)}
					>
						{`${hideTerritories ? "Show" : "Hide"} Territories`}
					</button>
					<div className="go-points">Points to win: {points}</div>
				</div>
				<div className="game-buttons">
					<div className="main-buttons">
						<button onClick={newGame}>New Game</button>
						<button onClick={() => setBoard(fillRandomBoard())}>
							Fill board
						</button>
					</div>
					<div className="pass">
						<button onClick={checkPass}>
							{`${turn === "black" ? "Black" : "White"} Pass`}
						</button>
					</div>
					<div
						className="cpu-option"
						onClick={() => setCPU(CPU ? false : turn)}
					>
						{CPU ? "CPU on" : "CPU off"}
					</div>
				</div>
			</div>
			<table className="go">
				<tbody className="go">
					{board.map((row, i) => (
						<tr key={i} className={i}>
							{row.map((square, j) => {
								let squareVal = square;
								if (square.includes("x") && hideTerritories) {
									squareVal = "";
								}
								return (
									<td
										key={j}
										className={`row-${i} col-${j} go ${squareVal}`}
										// onMouseEnter={(e) =>
										// 	e.target.classList.add(
										// 		`${turn}-hover`
										// 	)
										// }
										// onMouseLeave={(e) =>
										// 	e.target.classList.remove(
										// 		`${turn}-hover`
										// 	)
										// }
										onClick={handleClick}
									>
										<i
											id={`vertical-row-${i}`}
											className="line-vertical"
										></i>
										<i
											id={`horizontal-col-${j}`}
											className="line-horizontal"
										></i>
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

export default Go;
