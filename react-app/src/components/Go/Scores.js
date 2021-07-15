import React from "react";
import winGIF from "../../images/win.gif";

export default function Scores({
	blackScore,
	blackTerritory,
	blackStones,
	blackCaptures,
	whiteScore,
	whiteTerritory,
	whiteStones,
	whiteCaptures,
	CPU,
	winner,
	passes,
	setPasses,
	turn,
}) {
	return (
		<div className="white-black-score">
			<div className="black-scores">
				<div className="scores-background black">
					<div id="bscore">Black score {blackScore}</div>
					<div>Territories: {blackTerritory}</div>
					<div>Captures: {blackCaptures}</div>
					<div>Stones: {blackStones}</div>
				</div>
				<button
					className="pass"
					hidden={!(turn === "black" && CPU !== "black" && !winner)}
					onClick={() => setPasses(passes + 1)}
				>
					Pass
				</button>
			</div>
			<div className="win-message go">
				{winner &&
					`${
						winner[0].toUpperCase() + winner.slice(1, winner.length)
					} wins!`}
				{winner && <img className="win" alt="win" src={winGIF}></img>}
			</div>
			<div className="white-scores">
				<button
					className="pass"
					hidden={!(turn === "white" && CPU !== "white" && !winner)}
					onClick={() => setPasses(passes + 1)}
				>
					Pass
				</button>
				<div className="scores-background white">
					<div id="wscore">White score {whiteScore}</div>
					<div>Territories: {whiteTerritory}</div>
					<div>Captures: {whiteCaptures}</div>
					<div>Stones: {whiteStones}</div>
				</div>
			</div>
		</div>
	);
}
