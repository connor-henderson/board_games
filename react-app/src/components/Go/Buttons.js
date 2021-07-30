import React from "react";
import Cpu from "../Cpu";

export default function Buttons({
	newGame,
	randomFill,
	CPU,
	setCPU,
	CPUThoughts,
	setCPUThoughts,
	hideTerritories,
	setHideTerritories,
}) {
	return (
		<div className="game-buttons">
			<div className="main-buttons">
				<button onClick={newGame}>New Game</button>
				{/* <button onClick={randomFill}>Random Fill</button> */}
			</div>
			<button
				id="hideTerritory"
				onClick={() => setHideTerritories(!hideTerritories)}
			>
				{`${hideTerritories ? "Show" : "Hide"} Territories`}
			</button>
			<Cpu
				CPU={CPU}
				setCPU={setCPU}
				CPUThoughts={CPUThoughts}
				setCPUThoughts={setCPUThoughts}
			/>
		</div>
	);
}
