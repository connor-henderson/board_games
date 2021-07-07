import React, { useEffect, useState } from "react";
import updateBoard, { updateClickedSquare } from "../../assets/go/updateBoard";
import {
	checkEyesBoard,
	checkEyesBoard2,
} from "../../assets/go/presetPositions";
import "./Go.css";

const Go = () => {
	// In reference to the board's values:
	// w = white, b = black, wc = stone captured by white, bc = stone captured by white, x = non-playable,
	// "" = playable, "ko turns: #" = ko, "bp"/"wp" = priority, keep on board

	const [board, setBoard] = useState([[]]);
	const [hideTerritories, setHideTerritories] = useState(true);
	const [passes, setPasses] = useState(0);
	const [turn, setTurn] = useState("black");
	const [winner, setWinner] = useState(false);

	const [blackStones, setBlackStones] = useState(181);
	const [blackCaptures, setBlackCaptures] = useState(0);
	const [blackScore, setBlackScore] = useState(0);
	const [whiteStones, setWhiteStones] = useState(180);
	const [whiteCaptures, setWhiteCaptures] = useState(0);
	const [whiteScore, setWhiteScore] = useState(6.5);

	// end game options

	useEffect(() => {
		newGame();
	}, []);

	function checkPass() {
		if (passes + 1 > 1) {
			setWinner(blackScore > whiteScore ? "Black" : "White");
		}
		setTurn(turn === "black" ? "white" : "black");
		setPasses(passes + 1);
	}

	function newGame() {
		const newBoard = new Array(19)
			.fill([])
			.map((row) => new Array(19).fill(""));
		setTurn("black");
		setBoard(checkEyesBoard2);
		setWinner(false);
		setBlackScore(0);
		setWhiteScore(6.5);
		setBlackCaptures(0);
		setWhiteCaptures(0);
		setBlackStones(181);
		setWhiteStones(180);
	}

	function countTerritories(nextBoard) {
		let blackTerritory = 0;
		let whiteTerritory = 0;

		nextBoard.forEach((row) => {
			row.forEach((square) => {
				if (square === "bx" || square === "bc") blackTerritory += 1;
				else if (square === "wx" || square === "wc")
					whiteTerritory += 1;
			});
		});

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
		countTerritories(nextBoard);
		setBoard(nextBoard);
		setPasses(0);
		setTurn(turn === "black" ? "white" : "black");

		return;
	}

	return (
		<>
			{winner && `${winner} wins`}
			<div className="go-toggle">
				<button onClick={newGame}>New Game</button>
				<button onClick={() => setHideTerritories(!hideTerritories)}>
					{`${hideTerritories ? "Show" : "Hide"} Territories`}
				</button>
				<button onClick={checkPass}>
					{`${turn === "black" ? "Black" : "White"} Pass`}
				</button>
			</div>
			<div>
				<div>black score: {blackScore}</div>
				<div>white score: {whiteScore}</div>
			</div>
			<div>
				<div>black captures: {blackCaptures}</div>
				<div>white captures: {whiteCaptures}</div>
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
		</>
	);
};

export default Go;
