import React from "react";
import { useSelector } from "react-redux";
import { gamesInfo } from "../assets/GamesInfo";

export default function UserScores() {
  const user = useSelector((state) => state.session.user);

  //   Move scores stored in Redux into mappable gamesInfo
  gamesInfo.map((game) => {
    if (game.name === "Sudoku") {
      game[score] = user.sudoku_score;
    } else if (game.name === "Chess") {
      game[score] = user.chess_score;
    } else if (game.name === "Game Of Life") {
      game[score] = user.game_of_life_score;
    } else if (game.name === "Go") {
      game[score] = user.go_score;
    } else return "Game not found";

    return game;
  });

  return (
    <div className="user-scores-container">
      {gamesInfo.map((game, i) => (
        <div className="user-scores__game">
          <img
            className="user-scores__game-icon"
            src={game.icon}
            alt={`${game.name} icon`}
            style={{ height: "80px", width: "80px" }}
          />
          <p>
            {game.name === "Game Of Life" ? "Number of plays: " : "Score: "}
            {game.score}
          </p>
        </div>
      ))}
    </div>
  );
}
