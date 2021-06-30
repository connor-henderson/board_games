import React from "react";
import "./Leaderboards.css";
import sudokuIcon from "../../images/icons/sudoku.png";
import chessIcon from "../../images/icons/chess.png";
import gameOfLifeIcon from "../../images/icons/gameOfLife.png";
import goIcon from "../../images/icons/go.png";

export default function Rankings({ name, scores }) {
  function matchIcon(gameName) {
    if (gameName === "Sudoku") return sudokuIcon;
    else if (gameName === "Chess") return chessIcon;
    else if (gameName === "Game Of Life") return gameOfLifeIcon;
    else if (gameName === "Go") return goIcon;
    else return "Icon not found";
  }
  const icon = matchIcon(name);

  return (
    <div className="leaderboard">
      <span className="leaderboard-header">
        <h3 className="leaderboard-name">{name}</h3>
        <img
          className="leaderboard-icon"
          src={icon}
          alt={`${name} icon`}
          style={{ height: "80px", width: "80px" }}
        />
      </span>
      <table>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>{name === "Game Of Life" ? "# Plays" : "Score"}</th>
        </tr>
        {scores.map((score, i) => {
          let username = score[0];
          score = score[1];

          return (
            <tr key={i} className={i % 2 === 0 ? "even-rank" : "odd-rank"}>
              <td>{i+1}</td>
              <td>{username}</td>
              <td>{score}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
