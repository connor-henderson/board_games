import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneLeaderboard } from "../../store/leaderboards";
import Rankings from "./Rankings";
import "./Leaderboards.css";

export default function OneLeaderboard({ name }) {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const scores = useSelector((state) => state.leaderboards[name]);

	useEffect(() => {
		(async function () {
			let api_game_name = name.toLowerCase().replace(/ /g, "_");
			await dispatch(getOneLeaderboard(api_game_name));
			setLoaded(true);
		})();
	}, [dispatch, name]);

	if (!loaded) {
		return null;
	}

	return <Rankings name={name} scores={scores} />;
}
