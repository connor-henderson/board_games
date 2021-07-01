import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./GamesDashboard.css";

export default function OneGame({ game }) {
  const [hoverImage, setHoverImage] = useState(false);
  const history = useHistory();

  return (
    <div onClick={() => history.push(`/games/${game.url}`)} className="one-game-container">
      <div className="game-picture">
        <img
          src={game.icon}
          alt={`${game.name} icon`}
          style={{ height: "80px", width: "80px" }}
          onMouseEnter={() => setHoverImage(true)}
          onMouseLeave={() => setHoverImage(false)}
        />
        {hoverImage && <div className="hover-text">{game.description}</div>}
      </div>
      <h3>{game.name}</h3>
    </div>
  );
}
