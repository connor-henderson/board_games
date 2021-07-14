import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";

export default function Square({
	i,
	j,
	num,
	solution,
	board,
	clicked,
	setClicked,
	points,
}) {
	const [guess, setGuess] = useState(num);
	const [gameWon, setGameWon] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		setGuess(num);
		setGameWon(false);
	}, [num]);

	useEffect(() => {
		board[i][j] = guess;
		if (JSON.stringify(board) === JSON.stringify(solution))
			setGameWon(true);
	}, [guess, board, i, j, solution]);

	useEffect(() => {
		const winMessage = document.querySelector(".win-message");
		if (gameWon) {
			winMessage.classList.remove("--hidden");
			dispatch(updateUserScore(user.id, "sudoku", points));
		} else {
			winMessage.classList.add("--hidden");
		}
	}, [gameWon, dispatch, points, user.id]);

	const getBoxSquares = (rowStart, colStart) => {
		let boxSquares = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const row = `row-${rowStart + i}`;
				const col = `col-${colStart + j}`;
				const square = document.querySelector(`.${row}.${col}`);
				boxSquares.push(square);
			}
		}
		return boxSquares;
	};

	function handleClick(e) {
		setClicked(false);

		// set all squares background to white
		const squares = document.querySelectorAll("td");
		squares.forEach((square) => (square.id = ""));

		// find all squares in the same row, column
		const [row, col] = e.target.className.split(" ");
		const rowColSquares = document.querySelectorAll(`.${row}, .${col}`);

		// find all squares in the same box
		const [rowNum, colNum] = [parseInt(row[4], 10), parseInt(col[4], 10)];
		const boxSquares = getBoxSquares(
			rowNum - (rowNum % 3),
			colNum - (colNum % 3)
		);

		// turn all adjacent squares' background color to light brown
		const adjacent = [...rowColSquares, ...boxSquares];
		adjacent.forEach((square) => (square.id = "adjacent"));

		// make the clicked elements color dark brown
		e.target.id = "clicked";
	}

	const handleKeyPress = (e) => {
		e.preventDefault();
		if (e.charCode < 49 || e.charCode > 57) return;
		setGuess(e.charCode - 48);
	};

	return (
		<td
			onClick={handleClick}
			onKeyPress={handleKeyPress}
			className={
				num
					? `row-${i} col-${j} preset square`
					: `row-${i} col-${j} unset square`
			}
			suppressContentEditableWarning={true}
			contentEditable={!gameWon && !num}
		>
			{guess}
		</td>
	);
}
