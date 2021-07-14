import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import Presets from "./Presets";
import Size from "./Size";
import Speed from "./Speed";
import About from "./About";
import "./GameOfLife.css";

const GameOfLife = () => {
	const [universe, setUniverse] = useState([[]]);
	const [life, setLife] = useState(0);
	const [size, setSize] = useState({ rows: 25, columns: 40 });
	const [speed, setSpeed] = useState(200);
	const [mouseDown, setMouseDown] = useState(false);

	const user = useSelector((state) => state.session.user);
	const score = useSelector((state) => state.session.user.game_of_life_score);
	const dispatch = useDispatch();

	function newGame() {
		if (life) setLife(!life);

		const newUniverse = [];
		for (let i = 0; i < size.rows; i++) {
			const row = [];
			for (let j = 0; j < size.columns; j++) {
				row.push(false);
			}
			newUniverse.push(row);
		}
		setUniverse(newUniverse);

		const aliveCells = document.querySelectorAll(".alive");
		aliveCells.forEach((cell) => cell.classList.remove("alive"));
	}

	function liveLife() {
		const nextGeneration = JSON.parse(JSON.stringify(universe));
		for (let i = 0; i < universe.length; i++) {
			for (let j = 0; j < universe[i].length; j++) {
				const cell = document.querySelector(`.row-${i}.col-${j}`);
				const willBeAlive = checkNeighbors(i, j, universe[i][j]);

				if (willBeAlive) {
					nextGeneration[i][j] = true;
					if (!cell.classList.contains("alive")) {
						cell.classList.add("alive");
					}
				} else {
					nextGeneration[i][j] = false;
					cell.classList.remove("alive");
				}
			}
		}
		setUniverse(nextGeneration);
	}

	function checkNeighbors(row, col, alive) {
		const startRow = row - 1;
		const startCol = col - 1;
		const neighbors = [];

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let currentRow = startRow + i;
				let currentCol = startCol + j;

				if (i === 1 && j === 1) continue;
				if (currentRow < 0 || currentCol < 0) continue;
				if (currentRow > size.rows - 1 || currentCol > size.columns - 1)
					continue;

				neighbors.push(universe[currentRow][currentCol]);
			}
		}

		const numberOfNeighbours = neighbors.filter((cell) => cell).length;
		if (alive) {
			if (numberOfNeighbours > 1 && numberOfNeighbours < 4) return true;
		} else {
			if (numberOfNeighbours === 3) return true;
		}

		return false;
	}

	function handleMouseDown(e) {
		setMouseDown(true);
		if (!e.target.classList.contains("alive")) {
			e.target.classList.add("alive");

			const [row, col] = e.target.className.split(" ");
			const [rowNum, colNum] = [
				parseInt(row.slice(4, 6), 10),
				parseInt(col.slice(4, 6), 10),
			];

			const editedUniverse = JSON.parse(JSON.stringify(universe));
			editedUniverse[rowNum][colNum] = true;
			setUniverse(editedUniverse);
		}
	}

	useEffect(() => {
		newGame();
	}, [size]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!life) return;
		if (life === 1) {
			dispatch(updateUserScore(user.id, "game_of_life", 1));
		}

		const generation = setTimeout(() => {
			liveLife();
			setLife(life + 1);
		}, speed);

		return () => clearTimeout(generation);
	}, [dispatch, life, speed, user.id]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="game game-of-life">
			<About />
			<div className="game-nav">
				<Size setSize={setSize} size={size} setLife={setLife} />
				<div className="presets score">
					<Presets setUniverse={setUniverse} universe={universe} />
					<div className="game-of-life-score"># Plays: {score}</div>
				</div>
				<Speed
					setSpeed={setSpeed}
					speed={speed}
					setLife={setLife}
					life={life}
					newGame={newGame}
				/>
			</div>
			<div className="game-of-life directions">
				<i id="directions">Click and drag to create alive cells</i>
			</div>
			<table>
				<tbody className="game-of-life">
					{universe.map((row, i) => (
						<tr key={i} className={i}>
							{row.map((cell, j) => {
								return (
									<td
										key={j}
										id="cell"
										className={`row-${i} col-${j} life ${
											cell ? "alive" : ""
										}`}
										onMouseDown={handleMouseDown}
										onMouseUp={() => setMouseDown(false)}
										onMouseMove={
											mouseDown
												? handleMouseDown
												: () => {}
										}
									></td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameOfLife;
