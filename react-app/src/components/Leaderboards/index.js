import React, { useEffect, useState } from "react";
import AllLeaderboards from "./AllLeaderboards";
import OneLeaderboard from "./OneLeaderboard";
import "./Leaderboards.css"

export default function Leaderboard() {
  const [loaded, setLoaded] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showSudoku, setShowSudoku] = useState(false);
  const [showChess, setShowChess] = useState(false);
  const [showGameOfLife, setShowGameOfLife] = useState(false);
  const [showGo, setShowGo] = useState(false);

  function changeLeaderboards(e) {
    setShowAll(false);
    setShowSudoku(false);
    setShowChess(false);
    setShowGameOfLife(false);
    setShowGo(false);

    if (e.target.innerHTML.includes("All")) setShowAll(true);
    else if (e.target.innerHTML.includes("Sudoku")) setShowSudoku(true);
    else if (e.target.innerHTML.includes("Chess")) setShowChess(true);
    else if (e.target.innerHTML.includes("Game of Life")) setShowGameOfLife(true);
    else if (e.target.innerHTML.includes("Go")) setShowGo(true);
    else return;
  }


  return (
    <>
      <div className="leaderboards-toggle">
        <div className={showAll ? "--active" : ""} onClick={changeLeaderboards}>
          All
        </div>
        <div className={showSudoku ? "--active" : ""} onClick={changeLeaderboards}>
          Sudoku
        </div>
        <div className={showChess ? "--active" : ""} onClick={changeLeaderboards}>
          Chess
        </div>
        <div className={showGameOfLife ? "--active" : ""} onClick={changeLeaderboards}>
          Game of Life
        </div>
        <div className={showGo ? "--active" : ""} onClick={changeLeaderboards}>
          Go
        </div>
      </div>
      {showAll && <AllLeaderboards />}
      {showSudoku && <OneLeaderboard name={"Sudoku"} />}
      {showChess && <OneLeaderboard name={"Chess"} />}
      {showGameOfLife && <OneLeaderboard name={"Game of Life"} />}
      {showGo && <OneLeaderboard name={"Go"} />}
    </>
  );
}
