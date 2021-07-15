import React from "react";
import fillPreset, {
	gliderArr,
	oscillatorArr2,
	reaction,
} from "../../assets/gameOfLife/presets";
import gliderImg from "../../images/gameOfLife/glider.png";
import oscillatorImg from "../../images/gameOfLife/oscillator2.png";
import reactionImg from "../../images/gameOfLife/reaction.png";

export default function Presets({ universe, setUniverse }) {
	return (
		<div className="game-of-life presets">
			<div className="pre">Presets: </div>
			<div
				className="preset"
				onClick={() => setUniverse(fillPreset(universe, gliderArr))}
			>
				<img id="pre" src={gliderImg} alt="glider" />
				Gliders
			</div>
			<div
				className="preset"
				onClick={() =>
					setUniverse(fillPreset(universe, oscillatorArr2))
				}
			>
				<img id="pre" src={oscillatorImg} alt="oscillator" />
				Oscillators
			</div>
			<div
				className="preset"
				onClick={() => setUniverse(fillPreset(universe, reaction))}
			>
				<img id="pre" src={reactionImg} alt="reaction" />
				Reaction
			</div>
		</div>
	);
}
