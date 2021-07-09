import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore } from "../../store/session";
import { glider, oscillator } from "../../assets/gameOfLife/presetPositions";
import gliderImg from "../../images/gameOfLife/glider.png";
import oscillatorImg from "../../images/gameOfLife/oscillator2.png";
import "./GameOfLife.css";

const GameOfLife = () => {
	const small = { rows: 20, columns: 30 };
	const medium = { rows: 33, columns: 50 };
	const large = { rows: 45, columns: 70 };

	// const slow = 1000;
	// const moderate = 200;
	// const fast = 5;

	const [universe, setUniverse] = useState([[]]);
	const [life, setLife] = useState(0);
	const [size, setSize] = useState(large);
	const [speed, setSpeed] = useState(200);
	const [mouseDown, setMouseDown] = useState(false);

	const user = useSelector((state) => state.session.user);
	const score = useSelector((state) => state.session.user.game_of_life_score);
	const dispatch = useDispatch();

	useEffect(() => {
		newGame();
	}, [size]);

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
	}, [life]);

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

	function changeSize(newSize) {
		setLife(0);
		setSize(newSize);
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
		e.preventDefault();
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
			console.log(editedUniverse);

			setUniverse(editedUniverse);
		}
	}

	return (
		<div className="game game-of-life">
			<div className="game-nav">
				<div className="size-toggle toggle">
					<div
						className={size.rows === small.rows ? "--active" : ""}
						onClick={() => changeSize(small)}
					>
						Small
					</div>
					<div
						className={size.rows === medium.rows ? "--active" : ""}
						onClick={() => changeSize(medium)}
					>
						Medium
					</div>
					<div
						className={size.rows === large.rows ? "--active" : ""}
						onClick={() => changeSize(large)}
					>
						Large
					</div>
				</div>
				<div className="presets score">
					<div className="game-of-life presets">
						<div>Presets: </div>
						<div
							className="preset"
							onClick={() => setUniverse(glider(universe))}
						>
							<img id="pre" src={gliderImg} alt="glider" />
							Glider
						</div>
						<div
							className="preset"
							onClick={() => setUniverse(oscillator(universe))}
						>
							<img
								id="pre"
								src={oscillatorImg}
								alt="oscillator"
							/>
							Oscillator
						</div>
					</div>
					<div className="game-of-life-score"># Plays: {score}</div>
				</div>
				<div className="start-stop speed">
					<div>
						<button
							onClick={() => setLife(life ? 0 : life + 1)}
							className="start-stop universe"
						>
							{!life ? "Start" : "Stop"}
						</button>
						<button onClick={newGame} className="reset universe">
							Reset
						</button>
					</div>
					<div>
						<label className="speed" htmlFor="speed">
							Slower
						</label>
						<input
							type="range"
							className="speed"
							name="speed"
							max="-5"
							min="-1000"
							value={-speed}
							onChange={(e) => setSpeed(Math.abs(e.target.value))}
							step="1"
						></input>
						<label className="speed" htmlFor="speed">
							Faster
						</label>
					</div>
				</div>
			</div>
			<div className="game-of-life directions">
				<i id="directions">Click and drag to create alive cells</i>
			</div>
			<table>
				<tbody>
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
