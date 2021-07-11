import React from "react";
import "./SplashPage.css";

export default function SplashPage() {
	return (
		<div className="background">
			<div
				style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
				className="tagline-container"
			>
				<h2>Welcome to Board Games!</h2>
				<h4>
					Compete for the highest score in Sudoku, Chess, Go, and
					other popular games
				</h4>
			</div>
		</div>
	);
}
