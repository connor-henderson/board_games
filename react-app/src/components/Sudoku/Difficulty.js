import React from "react";

export default function Difficulty({ difficulty, setDifficulty }) {
	const cinch = 2;
	const easy = 30;
	const medium = 45;
	const hard = 55;
	const evil = 60;

	return (
		<div className="sudoku-info">
			<div className="difficulty-toggle toggle sudoku">
				<div
					className={difficulty === cinch ? "--active" : ""}
					onClick={() => setDifficulty(cinch)}
				>
					Cinch
				</div>
				<div
					className={difficulty === easy ? "--active" : ""}
					onClick={() => setDifficulty(easy)}
				>
					Easy
				</div>
				<div
					className={difficulty === medium ? "--active" : ""}
					onClick={() => setDifficulty(medium)}
				>
					Medium
				</div>
				<div
					className={difficulty === hard ? "--active" : ""}
					onClick={() => setDifficulty(hard)}
				>
					Hard
				</div>
				<div
					className={difficulty === evil ? "evil --active" : "evil"}
					onClick={() => setDifficulty(evil)}
				>
					Evil
				</div>
			</div>
		</div>
	);
}
