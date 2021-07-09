import React, { useEffect, useState } from "react";
import Rankings from "./Rankings";
import { useSelector, useDispatch } from "react-redux";
import { getAllLeaderboards } from "../../store/leaderboards";
import "./Leaderboards.css";

export default function AllLeaderboards() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	let leaderboards = useSelector((state) => state.leaderboards.All);

	useEffect(() => {
		(async () => {
			await dispatch(getAllLeaderboards());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<>
			{leaderboards.map((leaderboard, i) => (
				<Rankings
					key={i}
					name={leaderboard.name}
					scores={leaderboard.scores}
				/>
			))}
		</>
	);
}
