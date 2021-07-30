import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import {
	updateClickedSquare,
	fillRandomBoard,
} from "../../assets/go/updateBoard";

import Scores from "./Scores";
import Buttons from "./Buttons";
import Board from "./Board";
import getCPUMove from "../../assets/go/cpu";
import "./Go.css";

const Go = () => {
	// In reference to the board's (2D array) values:
	// w = white, b = black, wc = stone captured by white, bc = stone captured by black, x = non-playable,
	// "" = playable, "ko-" = ko, "bp"/"wp" = priority, keep on board

	const [board, setBoard] = useState([[]]);
	const [hideTerritories, setHideTerritories] = useState(true);
	const [turn, setTurn] = useState("black");
	const [passes, setPasses] = useState(0);
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
	const [blackStones, setBlackStones] = useState(181);

	const [whiteCaptures, setWhiteCaptures] = useState(0);
	const [whiteTerritory, setWhiteTerritory] = useState(0);
	const [whiteScore, setWhiteScore] = useState(6.5);
	const [whiteStones, setWhiteStones] = useState(180);

	useEffect(() => {
		newGame();
	}, []);

	useEffect(() => {
		if (CPU) setPoints(100);
		else {
			setPoints(0);
			setCPUThoughts(false);
		}
	}, [CPU]);

	useEffect(() => {
		if (!winner || !CPU || winner === CPU) return;

		dispatch(updateUserScore(user.id, "go", points));
	}, [winner, CPU, user.id, points, dispatch]);

	useEffect(() => {
		if (!blackStones && !whiteStones) {
			setWinner(blackScore > whiteScore ? "black" : "white");
		}
	}, [blackStones, whiteStones]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!CPU || CPU !== turn) return;
		const wouldWin = blackScore > whiteScore ? "black" : "white";
		if (passes && CPU === wouldWin) handlePass();
		else {
			const [nextBoard, chosenMove, validMoves] = getCPUMove(board, CPU);
			if (CPUThoughts)
				animateCPUThoughts(nextBoard, chosenMove, validMoves);
			else animateCPUMove(nextBoard, chosenMove);
		}
	}, [turn, CPU, board]); // eslint-disable-line react-hooks/exhaustive-deps

	function newGame() {
		const newBoard = new Array(19)
			.fill([])
			.map((row) => new Array(19).fill(""));
		setBlackScore(0);
		setBlackCaptures(0);
		setBlackTerritory(0);
		setBlackStones(181);
		setWhiteScore(6.5);
		setWhiteCaptures(0);
		setWhiteTerritory(0);
		setWhiteStones(180);

		setTurn("black");
		setPasses(0);
		setBoard(newBoard);
		setWinner(false);
	}

	function updateScores(nextBoard) {
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

		let currentBlackTerritory = 0;
		let currentWhiteTerritory = 0;
		nextBoard.forEach((row) => {
			row.forEach((square) => {
				if (square === "bx" || square === "bc")
					currentBlackTerritory += 1;
				else if (square === "wx" || square === "wc")
					currentWhiteTerritory += 1;
			});
		});

		setBlackCaptures(blackCaptures + capturedByBlack);
		setWhiteCaptures(whiteCaptures + capturedByWhite);

		setBlackTerritory(currentBlackTerritory);
		setWhiteTerritory(currentWhiteTerritory);

		setBlackScore(currentBlackTerritory - whiteCaptures - capturedByWhite);
		setWhiteScore(
			currentWhiteTerritory - blackCaptures - capturedByBlack + 6.5
		);
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

	function turnUpdates(nextBoard) {
		if (turn === "black") setBlackStones(blackStones - 1);
		else setWhiteStones(whiteStones - 1);
		updateScores(nextBoard);
		setTurn(turn === "black" ? "white" : "black");
		setBoard(nextBoard);
		setPasses(0);
	}

	function randomFill() {
		setBoard(fillRandomBoard());
		setBlackStones(100);
		setWhiteStones(99);
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

	function handlePass() {
		if (passes === 1) {
			setWinner(blackScore > whiteScore ? "black" : "white");
			console.log(blackScore > whiteScore ? "black" : "white");
		}
		setPasses(passes + 1);
		setTurn(turn === "black" ? "white" : "black");
	}

	return (
		<div className="go-container">
			<div className="game go">
				<div id="go-nav">
					<div className="game-nav go">
						<Scores
							blackScore={blackScore}
							blackTerritory={blackTerritory}
							blackStones={blackStones}
							blackCaptures={blackCaptures}
							whiteScore={whiteScore}
							whiteTerritory={whiteTerritory}
							whiteStones={whiteStones}
							whiteCaptures={whiteCaptures}
							CPU={CPU}
							winner={winner}
							turn={turn}
							setWinner={setWinner}
							handlePass={handlePass}
						/>
						<div className="account-score">
							<div className="account-go-score">
								Your score: {score}
							</div>
							<div className="go-points">
								Points to win: {points}
							</div>
						</div>
						<Buttons
							newGame={newGame}
							randomFill={randomFill}
							CPU={CPU}
							setCPU={setCPU}
							CPUThoughts={CPUThoughts}
							setCPUThoughts={setCPUThoughts}
							hideTerritories={hideTerritories}
							setHideTerritories={setHideTerritories}
						/>
					</div>
					<Board
						board={board}
						hideTerritories={hideTerritories}
						handleClick={handleClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default Go;
