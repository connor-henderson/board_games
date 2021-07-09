// constants
const GET_ALL_LEADERBOARDS = "leaderboards/GET_ALL_LEADERBOARDS";
const GET_ONE_LEADERBOARD = "leaderboards/GET_ONE_LEADERBOARD";

//thunks
const addLeaderboards = (type, payload) => ({
	type,
	payload,
});

export const getAllLeaderboards = () => async (dispatch) => {
	const response = await fetch("/api/leaderboards/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	if (data.errors) return;
	dispatch(addLeaderboards(GET_ALL_LEADERBOARDS, data));
};

export const getOneLeaderboard = (gameName) => async (dispatch) => {
	const response = await fetch(`/api/leaderboards/${gameName}`);
	const data = await response.json();
	if (data.errors) return;
	dispatch(addLeaderboards(GET_ONE_LEADERBOARD, data));
};

const initialState = { leaderboards: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_ALL_LEADERBOARDS:
			newState = Object.assign({}, state);
			newState.All = action.payload;
			return newState;
		case GET_ONE_LEADERBOARD:
			newState = Object.assign({}, state);
			newState[action.payload.name] = action.payload.scores;
			return newState;
		default:
			return state;
	}
}
