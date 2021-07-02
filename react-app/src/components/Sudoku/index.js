import React, { useState, useEffet, useEffect } from "react";
import Square from "./Square";
import {
  fastCreateSudokuSolution,
  trimSolution,
  createSudokuBoard,
} from "./functions";
import "./Sudoku.css";

const Sudoku = () => {
  const cinch = 2;
  const easy = 30;
  const medium = 45;
  const hard = 60;
  const evil = 65;

  const [difficulty, setDifficulty] = useState(cinch);
  const [solution, setSolution] = useState([[]]);
  const [board, setBoard] = useState([[]]);
//   const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    let solutionBoard = createSudokuBoard();
    fastCreateSudokuSolution(solutionBoard);
    setSolution(solutionBoard);

    const gameBoard = trimSolution(solutionBoard, difficulty);
    setBoard(gameBoard);
  };

  const reset = () => {
    const unset = document.querySelectorAll(".unset");
    unset.forEach((element) => (element.innerHTML = ""));
    return;
  };

  return (
    <>
      {false && <div className="win-message">You win!</div>}
      <div className="game-nav">
        <button onClick={newGame} className="new-game">
          New Game
        </button>
        <button onClick={reset} className="reset">
          Reset
        </button>
      </div>
      <table>
        <tbody>
          {board.map((row, i) => (
            <tr key={i} className={i}>
              {row.map((square, j) => {
                return (
                  <Square
                    key={j}
                    i={i}
                    j={j}
                    num={board[i][j]}
                    solution={solution}
                    board={board}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sudoku;
