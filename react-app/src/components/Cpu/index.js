import React from "react";

export default function Cpu({ CPU, setCPU, CPUThoughts, setCPUThoughts }) {
	return (
		<div className="chess-cpu-moves-container">
			<div className="chess-cpu container">
				<label htmlFor="chess-cpu toggle" className="chess-cpu">
					CPU
				</label>
				<div className="chess-cpu toggle">
					<div
						className={!CPU ? "--active" : ""}
						onClick={() => setCPU("")}
					>
						Off
					</div>
					<div
						className={CPU === "white" ? "--active" : ""}
						onClick={() => setCPU("white")}
					>
						White
					</div>
					<div
						className={CPU === "black" ? "--active" : ""}
						onClick={() => setCPU("black")}
					>
						Black
					</div>
				</div>
			</div>
			<div className="chess-cpu moves">
				{CPU && (
					<>
						<label htmlFor="show">Show Considered Moves</label>
						<input
							type="checkbox"
							name="show"
							onChange={() => setCPUThoughts(!CPUThoughts)}
							value={CPUThoughts}
						></input>
					</>
				)}
			</div>
		</div>
	);
}
