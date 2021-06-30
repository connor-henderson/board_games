import React, { useEffect, useState } from "react";
import AllLeaderboards from "./AllLeaderboards";
import SudokuLeaderboard from "./SudokuLeaderboard";
import "./Leaderboards.css"

export default function Leaderboard() {
  const [loaded, setLoaded] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showSudoku, setShowSudoku] = useState(false);

  function changeLeaderboards(e) {
    setShowAll(false);
    setShowSudoku(false);

    if (e.target.className.includes("all")) setShowAll(true);
    else if (e.target.className.includes("sudoku")) setShowSudoku(true);
    else return;
  }


  return (
    <>
      <div className="leaderboards-toggle">
        <div className="leaderboards-all" onClick={changeLeaderboards}>
          All
        </div>
        <div className="leaderboards-sudoku" onClick={changeLeaderboards}>
          Sudoku
        </div>
      </div>
      {showAll && <AllLeaderboards />}
      {showSudoku && <SudokuLeaderboard />}
    </>
  );
}
