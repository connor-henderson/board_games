import React, { useEffect, useState } from "react";
import { getAllLeaderboards } from "../../store/leaderboards";
import "./Leaderboards.css";

export default function Rankings({ name, scores }) {
  return (
    <div className="leaderboard">
      <h3 className="leaderboard-name">{name}</h3>
      {scores.map((score, i) => {
        let username = score[0];
        score = score[1];

        return (
          <ul key={i} className={i % 2 === 0 ? "even-rank" : "odd-rank"}>
            <li>{username}</li>
            <li>{score}</li>
          </ul>
        );
      })}
    </div>
  );
}
