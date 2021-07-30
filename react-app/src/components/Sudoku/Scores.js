import React from "react";
import winGIF from "../../images/win.gif";
import "./Sudoku.css";

export default function Scores({ points, score }) {
	return (
		<div className="scores">
			<div className="sudoku-score">Your score: {score}</div>
			<div className="win-message">
				<div className="win-msg sudoku --hidden">You win!</div>
				<img
					className="win-img sudoku --hidden"
					alt="win"
					src={winGIF}
				></img>
			</div>
			<div className="sudoku-points">Points to win: {points}</div>
		</div>
	);
}
