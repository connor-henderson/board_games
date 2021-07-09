import React from "react";
import { useSelector } from "react-redux";
import "./Leaderboards.css";
import sudokuIcon from "../../images/icons/sudoku.png";
import chessIcon from "../../images/icons/knight.png";
import gameOfLifeIcon from "../../images/icons/gameOfLife.png";
import goIcon from "../../images/icons/go.png";
import overallIcon from "../../images/logos/logo.png";

export default function Rankings({ name, scores }) {
	const user = useSelector((state) => state.session.user);
	function matchIcon(name) {
		if (name === "Sudoku") return sudokuIcon;
		else if (name === "Chess") return chessIcon;
		else if (name === "Game of Life") return gameOfLifeIcon;
		else if (name === "Go") return goIcon;
		else if (name === "Overall") return overallIcon;
		else return "Icon not found";
	}
	const icon = matchIcon(name);

	return (
		<div className="one-leaderboard">
			<div className="leaderboard-header">
				<div className="leaderboard-icon-container">
					<img
						className="leaderboard-icon"
						src={icon}
						alt={`${name} icon`}
					/>
				</div>
				<h3 className="leaderboard-name">
					{name === "Game of Life"
						? "John Conway's Game of Life"
						: name}
				</h3>
			</div>
			<div className="leaderboard-table">
				<table className="leaderboard">
					<thead>
						<tr>
							<th className="rank">Rank</th>
							<th className="username">Username</th>
							<th className="score">
								{name === "Game of Life" ? "# Plays" : "Score"}
							</th>
						</tr>
					</thead>
					<tbody className="leaderboard">
						{scores.map((score, i) => {
							let username = score[0];
							score = score[1];

							return (
								<tr
									className={
										user.username === username ? "user" : ""
									}
									bgcolor={
										i % 2 === 0 ? "white" : "lightgrey"
									}
									key={i}
								>
									<td className="rank">{i + 1}</td>
									<td className="username">{username}</td>
									<td className="score">{score}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
