import sudokuIcon from "../images/icons/sudoku.png";
import chessIcon from "../images/icons/knight.png";
import gameOfLifeIcon from "../images/icons/gameOfLife.png";
import goIcon from "../images/icons/go.png";

const sudoku = {
    "name": "Sudoku",
    "description": "Logic-based, combinatorial number-placement puzzle game",
    "icon": sudokuIcon,
}

const chess = {
    "name": "Chess",
    "description": "",
    "icon": chessIcon,
}

const gameOfLife = {
    "name": "John Conway's Game of Life",
    "description": "Visualize the cellular automaton devised by British mathematician John Horton Conway",
    "icon": gameOfLifeIcon,
}

const go = {
    "name": "Go",
    "description": "Strategically surround the other player's pieces in this Ancient classic",
    "icon": goIcon,
}

const gamesInfo = [sudoku, chess, gameOfLife, go]

export default gamesInfo
