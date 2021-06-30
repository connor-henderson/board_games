import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneLeaderboard } from "../../store/leaderboards";
import "./Leaderboards.css";

export default function SudokuLeaderboard() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(getOneLeaderboard("sudoku"));
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return <Rankings key={i} name={leaderboard.name} scores={leaderboard.scores} />;
}
