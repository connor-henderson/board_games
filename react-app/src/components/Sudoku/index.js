import React, { useState, useEffet, useEffect } from "react";
import Square from "./Square";
import { createSudokuSolution, trimSolution, boardComplete } from "./functions";
import "./Sudoku.css";

const Sudoku = () => {
  const emptySquares = 1;

  const [solution, setSolution] = useState([[]]);
  const [board, setBoard] = useState(trimSolution([[]]));

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    const newSolution = createSudokuSolution();
    const newBoard = trimSolution(newSolution, emptySquares);
    setSolution(newSolution);
    setBoard(newBoard);
  };

  const reset = () => {
    const unset = document.querySelectorAll(".unset");
    unset.forEach((element) => (element.innerHTML = ""));
    return;
  };



  return (
    <>
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
