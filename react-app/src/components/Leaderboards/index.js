import React, { useState } from "react";
import AllLeaderboards from "./AllLeaderboards";
import OneLeaderboard from "./OneLeaderboard";
import "./Leaderboards.css";

export default function Leaderboard() {
	const [showTop10s, setShowTop10s] = useState(true);
	const [showSudoku, setShowSudoku] = useState(false);
	const [showChess, setShowChess] = useState(false);
	const [showGameOfLife, setShowGameOfLife] = useState(false);
	const [showGo, setShowGo] = useState(false);
	const [showOverall, setShowOverall] = useState(false);

	function changeLeaderboards(e) {
		setShowTop10s(false);
		setShowSudoku(false);
		setShowChess(false);
		setShowGameOfLife(false);
		setShowGo(false);
		setShowOverall(false);

		if (e.target.innerHTML.includes("Top 10s")) setShowTop10s(true);
		else if (e.target.innerHTML.includes("Sudoku")) setShowSudoku(true);
		else if (e.target.innerHTML.includes("Chess")) setShowChess(true);
		else if (e.target.innerHTML.includes("Game of Life"))
			setShowGameOfLife(true);
		else if (e.target.innerHTML.includes("Go")) setShowGo(true);
		else if (e.target.innerHTML.includes("Overall")) setShowOverall(true);
		else return;
	}

	return (
		<div className="leaderboards">
			<div className="leaderboards-toggle toggle">
				<div
					className={showTop10s ? "--active" : ""}
					onClick={changeLeaderboards}
				>
					Top 10s
				</div>
				<div
					className={showOverall ? "--active" : ""}
					onClick={changeLeaderboards}
				>
					Overall
				</div>
				<div
					className={showSudoku ? "--active" : ""}
					onClick={changeLeaderboards}
				>
					Sudoku
				</div>
				<div
					className={showChess ? "--active" : ""}
					onClick={changeLeaderboards}
				>
					Chess
				</div>
				<div
					className={showGameOfLife ? "--active" : ""}
					onClick={changeLeaderboards}
				>
					Game of Life
				</div>
				<div
					className={showGo ? "go --active" : "go"}
					onClick={changeLeaderboards}
				>
					Go
				</div>
			</div>
			<div className="leaderboards-container">
				{showTop10s && <AllLeaderboards />}
				{showOverall && <OneLeaderboard name={"Overall"} />}
				{showSudoku && <OneLeaderboard name={"Sudoku"} />}
				{showChess && <OneLeaderboard name={"Chess"} />}
				{showGameOfLife && <OneLeaderboard name={"Game of Life"} />}
				{showGo && <OneLeaderboard name={"Go"} />}
			</div>
		</div>
	);
}
