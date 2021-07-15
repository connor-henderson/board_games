import React from "react";
import { useSelector } from "react-redux";
import gamesInfo from "../../assets/gamesInfo";
import "./User.css";

export default function UserScores() {
	const user = useSelector((state) => state.session.user);

	//   Move scores stored in Redux into mappable gamesInfo
	gamesInfo.map((game) => {
		game["score"] = user[game.api + "_score"];
		return game;
	});

	return (
		<div className="user-scores-background">
			<div className="user-scores-container">
				{gamesInfo.map((game, i) => (
					<div key={i} className="user-scores__game">
						<img
							className="user-scores__game-icon"
							src={game.icon}
							alt={`${game.name} icon`}
							style={{ height: "80px", width: "80px" }}
						/>
						<p className="game-name">{game.name}</p>
						<p>
							{game.name === "John Conway's Game of Life"
								? "# Plays: "
								: "Score: "}
							{game.score}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
