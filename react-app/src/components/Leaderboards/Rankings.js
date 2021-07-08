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
			<span className="leaderboard-header">
				<h3 className="leaderboard-name">
					{name === "Game of Life"
						? "John Conway's Game of Life"
						: name}
				</h3>
				<img
					className="leaderboard-icon"
					src={icon}
					alt={`${name} icon`}
					style={{ height: "80px", width: "80px" }}
				/>
			</span>
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Username</th>
						<th>{name === "Game of Life" ? "# Plays" : "Score"}</th>
					</tr>
				</thead>
				<tbody>
					{scores.map((score, i) => {
						let username = score[0];
						score = score[1];

						return (
							<tr
								className={
									user.username === username ? "user" : ""
								}
								bgcolor={i % 2 === 0 ? "white" : "lightgrey"}
								key={i}
							>
								<td>{i + 1}</td>
								<td>{username}</td>
								<td>{score}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
