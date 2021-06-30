import React from "react";
import { useSelector } from "react-redux";
import gamesInfo from "../../assets/gamesInfo";
import "./User.css"

export default function UserScores() {
  const user = useSelector((state) => state.session.user);

  //   Move scores stored in Redux into mappable gamesInfo
  gamesInfo.map((game) => {
    let redux_score_key;
    if (game.name.includes("John Conway")) {
      redux_score_key = "game_of_life_score";
    } else {
      redux_score_key = game.name.toLowerCase().replace(/ /g, "_") + "_score";
    }
    game["score"] = user[redux_score_key];
    return game;
  });

  return (
    <div className="user-scores-container">
      {gamesInfo.map((game, i) => (
        <div key={i} className="user-scores__game">
          <img
            className="user-scores__game-icon"
            src={game.icon}
            alt={`${game.name} icon`}
            style={{ height: "80px", width: "80px" }}
          />
          <p className="game-name">
            {game.name}
          </p>
          <p>
            {game.name === "John Conway's Game of Life" ? "Number of plays: " : "Score: "}
            {game.score}
          </p>
        </div>
      ))}
    </div>
  );
}
