import React from "react";

export default function Size({ size, setSize, setLife }) {
	const small = { rows: 18, columns: 25 };
	const medium = { rows: 25, columns: 40 };
	const large = { rows: 40, columns: 50 };

	function changeSize(newSize) {
		setLife(0);
		setSize(newSize);
	}

	return (
		<div className="size-toggle toggle">
			<div
				className={size.rows === small.rows ? "--active" : ""}
				onClick={() => changeSize(small)}
			>
				Small
			</div>
			<div
				className={size.rows === medium.rows ? "--active" : ""}
				onClick={() => changeSize(medium)}
			>
				Medium
			</div>
			<div
				className={size.rows === large.rows ? "--active" : ""}
				onClick={() => changeSize(large)}
			>
				Large
			</div>
		</div>
	);
}
