const middleRows = new Array(19).fill("");
middleRows[11] = "w";
middleRows[12] = "b";
middleRows[16] = "b";
middleRows[17] = "w";

const middle = new Array(19).fill("");
const border = new Array(19).fill("");

middle[1] = "w";
middle[2] = "b";
middle[6] = "b";
middle[7] = "w";
border[1] = "w";
border[2] = "b";
border[3] = "b";
border[4] = "b";
border[5] = "b";
border[6] = "b";
border[7] = "w";

export const checkEyesBoard = [
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill("w"),
	middleRows,
	middleRows,
	new Array(19).fill("w"),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
];

export const checkEyesBoard2 = [
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill("w"),
	border,
	middle,
	border,
	new Array(19).fill("w"),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
	new Array(19).fill(""),
];
