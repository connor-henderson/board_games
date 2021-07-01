import React from "react";
import Square from "./Square";
import { createSudokuSolution } from "./functions";
import "./Sudoku.css";

const Sudoku = () => {
  // write the game board. innerHTML is fine for keeping track of numbers
  //   generate solution
  // save solution
  // halve solution to fill in initial board
  // check board
  //
  createSudokuSolution();

  let board = [];
  for (let i = 0; i < 9; i++) {
    let newRow = [];

    for (let j = 0; j < 9; j++) {
      if (j % 2 === 0) {
        newRow.push("");
      } else {
        newRow.push(j);
      }
    }

    board.push(newRow);
  }

  return (
    <table>
      <tbody>
        {board.map((row, i) => (
          <tr key={i} className={i}>
            {row.map((square, j) => {
              return <Square key={j} i={i} j={j} num={board[i][j]} />;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Sudoku;
