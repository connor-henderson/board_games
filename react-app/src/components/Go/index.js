import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import {
	updateClickedSquare,
	fillRandomBoard,
} from "../../assets/go/updateBoard";
import Cpu from "../Cpu/";
import getCPUMove from "../../assets/go/cpu";
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
	const [CPU, setCPU] = useState("");
	const [CPUThoughts, setCPUThoughts] = useState(false);
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
		if (CPU) setPoints(100);
		else setPoints(0);
	}, [CPU]);

	useEffect(() => {
		if (!winner || !CPU || winner === CPU) return;

		dispatch(updateUserScore(user.id, "go", points));
	}, [winner, CPU, user.id, points, dispatch]);

	useEffect(() => {
		if (!CPU || CPU !== turn) return;
		const [nextBoard, chosenMove, validMoves] = getCPUMove(board, CPU);
		if (CPUThoughts) animateCPUThoughts(nextBoard, chosenMove, validMoves);
		else animateCPUMove(nextBoard, chosenMove);
	}, [turn, CPU, board]); // eslint-disable-line react-hooks/exhaustive-deps

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
		setBlackTerritory(0);
		setWhiteTerritory(0);
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
		// edit, state will not update until after function runs
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

	function animateCPUThoughts(nextBoard, chosenMove, validMoves) {
		// it should always take 3 seconds to animate the CPU Moves
		const delay = 3000 / validMoves.length;
		for (let i = 0; i < validMoves.length; i++) {
			const [row, col] = validMoves[i].split(" ");
			const ele = document.querySelector(`.row-${row}.col-${col}`);
			setTimeout(() => {
				ele.classList.add("--clicked", `${i}`);
			}, delay * i);
			setTimeout(() => {
				ele.classList.remove("--clicked", `${i}`);
			}, delay * i + 100);
		}
		setTimeout(() => animateCPUMove(nextBoard, chosenMove), 3100);
	}

	function animateCPUMove(nextBoard, chosenMove) {
		const [row, col] = chosenMove.split(" ");
		const ele = document.querySelector(`.row-${row}.col-${col}`);
		ele.classList.add("--clicked");
		setTimeout(() => {
			ele.classList.remove("--clicked");
			turnUpdates(nextBoard);
		}, 500);
	}

	function handleClick(e) {
		// always get the parent td element
		let square = e.target;
		if (e.target.nodeName === "I") {
			square = e.target.parentNode;
		}

		const [row, col] = square.classList;
		const [rowNum, colNum] = [
			parseInt(row.slice(4, 6), 10),
			parseInt(col.slice(4, 6), 10),
		];

		const nextBoard = updateClickedSquare(board, rowNum, colNum, turn);
		if (!nextBoard) return;
		turnUpdates(nextBoard);

		return;
	}

	function turnUpdates(nextBoard) {
		countCaptures(nextBoard);
		countTerritories(nextBoard);
		setTurn(turn === "black" ? "white" : "black");
		setBoard(nextBoard);
		setPasses(0);
	}

	return (
		<div className="go-container">
			<div className="game go">
				<div id="go-nav">
					<div className="win-message go">
						{winner && `${winner} wins!`}
					</div>
					<div className="game-nav go">
						<div className="white-black-score">
							<div className="black-scores">
								<div className="scores-background black">
									<div id="bscore">
										Black score {blackScore}
									</div>
									<div>Territories: {blackTerritory}</div>
									<div>Captures: {blackCaptures}</div>
								</div>

								<button
									className="pass"
									hidden={turn === "black" ? true : false}
									onClick={checkPass}
								>
									Pass
								</button>
							</div>
							<div className="white-scores">
								<button
									className="pass"
									hidden={turn === "white" ? true : false}
									onClick={checkPass}
								>
									Pass
								</button>
								<div className="scores-background white">
									<div id="wscore">
										White score {whiteScore}
									</div>
									<div>Territories: {whiteTerritory}</div>
									<div>Captures: {whiteCaptures}</div>
								</div>
							</div>
						</div>
						<div className="go-score">
							<div className="go-score">Your score: {score}</div>
							<div className="go-points">
								Points to win: {points}
							</div>
						</div>
						<div className="game-buttons">
							<div className="main-buttons">
								<button onClick={newGame}>New Game</button>
								<button
									onClick={() => setBoard(fillRandomBoard())}
								>
									Random Fill
								</button>
							</div>
							<button
								id="hideTerritory"
								onClick={() =>
									setHideTerritories(!hideTerritories)
								}
							>
								{`${
									hideTerritories ? "Show" : "Hide"
								} Territories`}
							</button>
							<Cpu
								CPU={CPU}
								setCPU={setCPU}
								CPUThoughts={CPUThoughts}
								setCPUThoughts={setCPUThoughts}
							/>
						</div>
					</div>
					<table className="go">
						<tbody className="go">
							{board.map((row, i) => (
								<tr key={i} className={i}>
									{row.map((square, j) => {
										let squareVal = square;
										if (
											square.includes("x") &&
											hideTerritories
										) {
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
			</div>
		</div>
	);
};

export default Go;
