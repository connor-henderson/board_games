import React, { useEffect, useState } from "react";
import updateBoard from "../../assets/go/updateBoard";
import captured from "../../images/go/square_border.png";
import "./Go.css";

const Go = () => {
	// In reference to the board: w = white, b = black, c = captured, x = non-playable, "" = playable
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
		console.log(newBoard);

		setTurn("black");
		setBoard(newBoard);
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

		// if it is not a playable space, return
		if (board[rowNum][colNum]) return;

		// add the placed stone and update the board and turns
		const boardWithClick = JSON.parse(JSON.stringify(board));
		boardWithClick[rowNum][colNum] = turn === "black" ? "b" : "w";
		const nextBoard = updateBoard(boardWithClick);
		// console.log(nextBoard);
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
