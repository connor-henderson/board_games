import React, { useEffect, useState } from "react";
import updateBoard, { updateClickedSquare } from "../../assets/go/updateBoard";
import captured from "../../images/go/square_border.png";
import {
	checkEyesBoard,
	checkEyesBoard2,
} from "../../assets/go/presetPositions";
import "./Go.css";

const Go = () => {
	// In reference to the board's values:
	// w = white, b = black, wc = captured white stone, wb = captured black stone, x = non-playable,
	// "" = playable, "ko turns: #" = ko, "bp"/"wp" = priority, keep on board

	const [board, setBoard] = useState([[]]);

	const [blackStones, setBlackStones] = useState(181);
	const [whiteStones, setWhiteStones] = useState(180);
	const [turn, setTurn] = useState("black");
	const [winner, setWinner] = useState(false);

	useEffect(() => {
		newGame();
	}, []);

	function newGame() {
		const newBoard = new Array(19)
			.fill([])
			.map((row) => new Array(19).fill(""));
		setTurn("black");
		setBoard(checkEyesBoard2);
		setWinner(false);
	}

	function handleClick(e) {
		// always get the parent td element
		let square = e.target;
		if (e.target.nodeName === "I") {
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
		setBoard(nextBoard);
		setTurn(turn === "black" ? "white" : "black");

		return;
	}

	return (
		<>
			{winner && `${winner} wins`}
			<div className="go-toggle">
				<button onClick={newGame}>New Game</button>
			</div>
			<table className="go">
				<tbody className="go">
					{board.map((row, i) => (
						<tr key={i} className={i}>
							{row.map((square, j) => {
								return (
									<td
										key={j}
										className={`row-${i} col-${j} go ${board[i][j]}`}
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
											id={`${i === 0 ? "top" : ""}${
												i === 18 ? "bottom" : ""
											}`}
											className="line-vertical"
										></i>
										<i
											id={`${j === 0 ? "left" : ""}${
												j === 18 ? "right" : ""
											}`}
											className="line-horizontal"
										></i>
										{board[i][j] === "c" && (
											<img
												id="captured"
												src={captured}
												alt={"captured square"}
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

export default Go;
