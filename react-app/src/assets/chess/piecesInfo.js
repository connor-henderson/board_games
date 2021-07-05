import bishopBlack from "../../images/chess/bishop-black.png";
import rookBlack from "../../images/chess/rook-black.png";
import knightBlack from "../../images/chess/knight-black.png";
import kingBlack from "../../images/chess/king-black.png";
import queenBlack from "../../images/chess/queen-black.png";
import pawnBlack from "../../images/chess/pawn-black.png";

import bishopWhite from "../../images/chess/bishop-white.png";
import rookWhite from "../../images/chess/rook-white.png";
import knightWhite from "../../images/chess/knight-white.png";
import kingWhite from "../../images/chess/king-white.png";
import queenWhite from "../../images/chess/queen-white.png";
import pawnWhite from "../../images/chess/pawn-white.png";

export const pieceValues = {
	"pawn": 1,
	"knight": 3,
	"bishop": 3,
	"rook": 5,
	"queen": 9,
};

const bishopB = { "name": "bishop", "team": "black", "image": bishopBlack };
const rookB = { "name": "rook", "team": "black", "image": rookBlack };
const knightB = { "name": "knight", "team": "black", "image": knightBlack };
const kingB = { "name": "king", "team": "black", "image": kingBlack };
const queenB = { "name": "queen", "team": "black", "image": queenBlack };
const pawnB = { "name": "pawn", "team": "black", "image": pawnBlack };

const bishopW = { "name": "bishop", "team": "white", "image": bishopWhite };
const rookW = { "name": "rook", "team": "white", "image": rookWhite };
const knightW = { "name": "knight", "team": "white", "image": knightWhite };
const kingW = { "name": "king", "team": "white", "image": kingWhite };
const queenW = { "name": "queen", "team": "white", "image": queenWhite };
const pawnW = { "name": "pawn", "team": "white", "image": pawnWhite };

export const blackTeam = [bishopB, rookB, knightB, kingB, queenB, pawnB];
export const whiteTeam = [bishopW, rookW, knightW, kingW, queenW, pawnW];

bishopW["alt"] = bishopB;
rookW["alt"] = rookB;
knightW["alt"] = knightB;
kingW["alt"] = kingB;
queenW["alt"] = queenB;
pawnW["alt"] = pawnB;

const pieces = {
	bishopB,
	rookB,
	knightB,
	kingB,
	queenB,
	pawnB,
	bishopW,
	rookW,
	knightW,
	kingW,
	queenW,
	pawnW,
};

export const blackTopRow = [
	pieces.rookB,
	pieces.knightB,
	pieces.bishopB,
	pieces.kingB,
	pieces.queenB,
	pieces.bishopB,
	pieces.knightB,
	pieces.rookB,
];

export const blackBottomRow = [
	pieces.rookB,
	pieces.knightB,
	pieces.bishopB,
	pieces.queenB,
	pieces.kingB,
	pieces.bishopB,
	pieces.knightB,
	pieces.rookB,
];

export const whiteTopRow = [
	pieces.rookW,
	pieces.knightW,
	pieces.bishopW,
	pieces.queenW,
	pieces.kingW,
	pieces.bishopW,
	pieces.knightW,
	pieces.rookW,
];

export const whiteBottomRow = [
	pieces.rookW,
	pieces.knightW,
	pieces.bishopW,
	pieces.kingW,
	pieces.queenW,
	pieces.bishopW,
	pieces.knightW,
	pieces.rookW,
];

export const middleRows = [
	new Array(8).fill(""),
	new Array(8).fill(""),
	new Array(8).fill(""),
	new Array(8).fill(""),
];

export default pieces;
