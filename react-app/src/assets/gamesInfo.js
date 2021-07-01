import sudokuIcon from "../images/icons/sudoku.png";
import chessIcon from "../images/icons/knight.png";
import gameOfLifeIcon from "../images/icons/gameOfLife.png";
import goIcon from "../images/icons/go.png";

const sudoku = {
    "name": "Sudoku",
    "api": "sudoku",
    "url": "sudoku",
    "description": "Determine the missing numbers in this logic-based combinatorial number-placement puzzle game",
    "icon": sudokuIcon,
}

const chess = {
    "name": "Chess",
    "api": "chess",
    "url": "chess",
    "description": "Compete against a computer in international chess",
    "icon": chessIcon,
}

const gameOfLife = {
    "name": "John Conway's Game of Life",
    "api": "game_of_life",
    "url": "game-of-life",
    "description": "Visualize the cellular automaton devised by British mathematician John Horton Conway",
    "icon": gameOfLifeIcon,
}

const go = {
    "name": "Go",
    "api": "go",
    "url": "go",
    "description": "Strategically surround the computer player's pieces in this Ancient classic",
    "icon": goIcon,
}

const gamesInfo = [sudoku, chess, gameOfLife, go]

export default gamesInfo
