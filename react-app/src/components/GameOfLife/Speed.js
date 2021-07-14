import React from "react";

export default function Speed({ speed, setSpeed, setLife, life, newGame }) {
	return (
		<div className="start-stop speed">
			<div>
				<button
					onClick={() => setLife(life ? 0 : life + 1)}
					className="start-stop universe"
				>
					{!life ? "Start" : "Stop"}
				</button>
				<button onClick={newGame} className="reset universe">
					Reset
				</button>
			</div>
			<div>
				<label className="speed" htmlFor="speed">
					Slower
				</label>
				<input
					type="range"
					className="speed"
					name="speed"
					max="-5"
					min="-1000"
					value={-speed}
					onChange={(e) => setSpeed(Math.abs(e.target.value))}
					step="1"
				></input>
				<label className="speed" htmlFor="speed">
					Faster
				</label>
			</div>
		</div>
	);
}
