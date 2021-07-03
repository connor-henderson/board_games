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
  const hard = 70;
  const evil = 80;

  const [difficulty, setDifficulty] = useState(cinch);
  const [solution, setSolution] = useState([[]]);
  const [board, setBoard] = useState([[]]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    newGame();
  }, [difficulty]);

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

  function handleClick(e) {
    e.stopPropagation();
    console.log(e.target.classList.contains("square"));
    if (!e.target.classList.contains("square")) {
      setClicked(false);
    }
  }


  useEffect(() => {
    if (clicked) return;

    // document is not ready yet, JS is loading first

    document.addEventListener("DOMContentLoaded", () => {
        const squares = document.querySelectorAll("td");
        squares.forEach((square) => (square.id = ""));
        console.log(squares)
    })
    // let squares = document.getElementsByTagName("td");
    // console.log(squares)
    // for (let i=0; i < squares.length; i++) {
    //     console.log(squares[i])
    //     squares[i].id = "";
    // }

    setClicked(false);

    return document.removeEventListener("", () => {
        const squares = document.querySelectorAll("td");
        squares.forEach((square) => (square.id = ""));
    });
  }, [clicked]);

  return (
    <div onClick={handleClick}>
      <div className="win-message --hidden">You win!</div>
      <div className="game-nav">
        <div className="difficulty-toggle toggle">
          <div
            className={difficulty === cinch ? "--active" : ""}
            onClick={() => setDifficulty(cinch)}
          >
            Cinch
          </div>
          <div
            className={difficulty === easy ? "--active" : ""}
            onClick={() => setDifficulty(easy)}
          >
            Easy
          </div>
          <div
            className={difficulty === medium ? "--active" : ""}
            onClick={() => setDifficulty(medium)}
          >
            Medium
          </div>
          <div
            className={difficulty === hard ? "--active" : ""}
            onClick={() => setDifficulty(hard)}
          >
            Hard
          </div>
          <div
            className={difficulty === evil ? "evil --active" : "evil"}
            onClick={() => setDifficulty(evil)}
          >
            Evil
          </div>
        </div>
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
                    clicked={clicked}
                    setClicked={setClicked}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sudoku;
