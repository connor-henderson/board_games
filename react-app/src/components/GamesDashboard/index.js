import React from "react";
import gamesInfo from "../../assets/gamesInfo";
import OneGame from "./OneGame";
import "./GamesDashboard.css";

export default function GamesDashboard() {
	// render a component for each game

	return (
		<div className="games-dashboard-background">
			<div className="all-games-container">
				{gamesInfo.map((game, i) => (
					<OneGame key={i} game={game} />
				))}
			</div>
		</div>
	);
}
