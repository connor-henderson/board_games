import React, { useState } from "react";

export default function Square({ i, j, num }) {
  const [guess, setGuess] = useState(num);

  function handleClick(e) {
    // set all squares background to white
    const squares = document.querySelectorAll("td");
    squares.forEach((square) => (square.id = ""));

    // find all squares in the same row, column and set their color to light brown
    const [row, col] = e.target.className.split(" ");
    const adjacent = document.querySelectorAll(`.${row}, .${col}`);
    adjacent.forEach((square) => (square.id = "adjacent"));

    // -------- TO DO --------
    // find all squares in the same box and set their color to light brown
    // const [rowNum, colNum] = [parseInt(row[4], 10), parseInt(col[4], 10)];

    // let elements = [];
    // // travel up
    // for (let i = 0; i < 3; i++) {
    //     const currentRowNum = rowNum + i;
    //     const currentRow = `row-${currentRowNum}`;
    //     const nextElement = document.querySelector(`.${currentRow}.${col}`)
    //     elements.push(nextElement)

    //     // stop after 0, 3, 6
    //     if ([0,3,6].includes(currentRowNum)) break;
    // }

    // elements.forEach((element) => (element.id = "adjacent"));

    // make the clicked elements color light brown
    e.target.id = "clicked";
  }

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.charCode < 49 || e.charCode > 57) return;
    setGuess(e.charCode - 48)
  };

  return (
    <td
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      className={`row-${i} col-${j}`}
      contentEditable={!num}
    >
      {guess}
    </td>
  );
}
