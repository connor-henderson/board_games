import React from "react";

export default function Board({ board, hideTerritories, handleClick }) {
	return (
		<table className="go">
			<tbody className="go">
				{board.map((row, i) => (
					<tr key={i} className={i}>
						{row.map((square, j) => {
							let squareVal = square;
							if (square.includes("x") && hideTerritories) {
								squareVal = "";
							}
							return (
								<td
									key={j}
									className={`row-${i} col-${j} go ${squareVal}`}
									onClick={handleClick}
								>
									<i
										id={`vertical-row-${i}`}
										className="line-vertical"
									></i>
									<i
										id={`horizontal-col-${j}`}
										className="line-horizontal"
									></i>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
