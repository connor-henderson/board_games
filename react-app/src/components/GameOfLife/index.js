import React, { useState, useEffect } from "react";
import "./GameOfLife.css";

const GameOfLife = () => {
  const small = { rows: 15, columns: 30 };
  const medium = { rows: 30, columns: 60 };
  const large = { rows: 45, columns: 90 };

  const slow = 1000;
  const moderate = 200;
  const fast = 5;

  const [universe, setUniverse] = useState([[]]);
  const [life, setLife] = useState(0);
  const [size, setSize] = useState(large);
  const [speed, setSpeed] = useState(moderate);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    newGame();
  }, [size]);

  useEffect(() => {
    if (!life) return;

    const generation = setTimeout(() => {
      liveLife();
      setLife(life + 1);
    }, speed);

    return () => clearTimeout(generation);
  }, [life]);

  function newGame() {
    const newUniverse = [];
    for (let i = 0; i < size.rows; i++) {
      const row = [];
      for (let j = 0; j < size.columns; j++) {
        row.push(false);
      }
      newUniverse.push(row);
    }
    setUniverse(newUniverse);

    const aliveCells = document.querySelectorAll(".alive");
    aliveCells.forEach((cell) => cell.classList.remove("alive"));
  }

  function liveLife() {
    const nextGeneration = JSON.parse(JSON.stringify(universe));
    for (let i = 0; i < universe.length; i++) {
      for (let j = 0; j < universe[i].length; j++) {
        const cell = document.querySelector(`.row-${i}.col-${j}`);
        const willBeAlive = checkNeighbors(i, j, universe[i][j]);

        if (willBeAlive) {
          nextGeneration[i][j] = true;
          if (!cell.classList.contains("alive")) {
            cell.classList.add("alive");
          }
        } else {
          nextGeneration[i][j] = false;
          cell.classList.remove("alive");
        }
      }
    }
    setUniverse(nextGeneration);
  }

  function checkNeighbors(row, col, alive) {
    const startRow = row - 1;
    const startCol = col - 1;
    const neighbors = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let currentRow = startRow + i;
        let currentCol = startCol + j;

        if (i === 1 && j === 1) continue;
        if (currentRow < 0 || currentCol < 0) continue;
        if (currentRow > size.rows - 1 || currentCol > size.columns - 1)
          continue;

        neighbors.push(universe[currentRow][currentCol]);
      }
    }

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    const numberOfNeighbours = neighbors.filter((cell) => cell).length;

    if (alive) {
      if (numberOfNeighbours > 1 && numberOfNeighbours < 4) return true;
    } else {
      if (numberOfNeighbours === 3) return true;
    }

    return false;
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setMouseDown(true);

    if (!e.target.classList.contains("alive")) {
      e.target.classList.add("alive");

      const [row, col] = e.target.className.split(" ");
      const [rowNum, colNum] = [
        parseInt(row.slice(4, 6), 10),
        parseInt(col.slice(4, 6), 10),
      ];

      const editedUniverse = JSON.parse(JSON.stringify(universe));
      editedUniverse[rowNum][colNum] = true;

      setUniverse(editedUniverse);
    }
  }

  return (
    <>
      <div className="game-of-life-toggle">
        <div className="speed-toggle toggle">
          <div
            className={speed === slow ? "--active" : ""}
            onClick={() => setSpeed(slow)}
          >
            Slow
          </div>
          <div
            className={speed === moderate ? "--active" : ""}
            onClick={() => setSpeed(moderate)}
          >
            Moderate
          </div>
          <div
            className={speed === fast ? "--active" : ""}
            onClick={() => setSpeed(fast)}
          >
            Fast
          </div>
        </div>
        <div className="size-toggle toggle">
          <div
            className={size.rows === small.rows ? "--active" : ""}
            onClick={() => setSize(small)}
          >
            Small
          </div>
          <div
            className={size.rows === medium.rows ? "--active" : ""}
            onClick={() => setSize(medium)}
          >
            Medium
          </div>
          <div
            className={size.rows === large.rows ? "--active" : ""}
            onClick={() => setSize(large)}
          >
            Large
          </div>
        </div>
      </div>
      <button onClick={newGame} className="reset universe">
        Reset
      </button>
      {!life && (
        <button onClick={() => setLife(life + 1)} className="start universe">
          Start
        </button>
      )}
      {life > 0 && (
        <button onClick={() => setLife(0)} className="stop universe">
          Stop
        </button>
      )}
      <table>
        <tbody>
          {universe.map((row, i) => (
            <tr key={i} className={i}>
              {row.map((cell, j) => {
                return (
                  <td
                    key={j}
                    id="cell"
                    className={`row-${i} col-${j} life`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={() => setMouseDown(false)}
                    onMouseMove={mouseDown ? handleMouseDown : () => {}}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GameOfLife;
