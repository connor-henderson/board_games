import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./GamesDashboard.css";

export default function OneGame({ game }) {
	const [hoverImage, setHoverImage] = useState(false);
	const history = useHistory();

	return (
		<div
			onClick={() => history.push(`/games/${game.url}`)}
			className="one-game-container"
			onMouseEnter={() => setHoverImage(true)}
			onMouseLeave={() => setHoverImage(false)}
		>
			<div className="game-picture">
				{hoverImage && game.description}
				<img src={game.board} alt={`${game.name} icon`} />
			</div>
			<h3 className="game-name">{game.name}</h3>
		</div>
	);
}
