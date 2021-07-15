import React from "react";

export default function LostPieces({ whiteLostPieces, blackLostPieces }) {
	return (
		<div className="chess-pieces">
			<div className="white lost-pieces">
				{whiteLostPieces.map((piece, j) => (
					<img
						className="lost-piece"
						key={j}
						src={piece.image}
						alt={piece.name}
					/>
				))}
			</div>
			<div className="black lost-pieces">
				{blackLostPieces.map((piece, i) => (
					<img
						className="lost-piece"
						key={i}
						src={piece.image}
						alt={piece.name}
					/>
				))}
			</div>
		</div>
	);
}
