import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SplashPage from "./components/SplashPage/";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import NavBar from "./components/Navigation/";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import User from "./components/UserPages/User";
import Leaderboards from "./components/Leaderboards";
import { authenticate } from "./store/session";
import UserScores from "./components/UserPages/UserScores";
import GamesDashboard from "./components/GamesDashboard";
import Sudoku from "./components/Sudoku";
import Chess from "./components/Chess";
import GameOfLife from "./components/GameOfLife";
import Go from "./components/Go";
import About from "./components/About";

function App() {
	// const [authenticated, setAuthenticated] = useState(false);
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar loaded={loaded} />
			<Switch>
				<Route path="/" exact={true}>
					<SplashPage />
				</Route>
				<Route path="/about" exact={true}>
					<About />
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path="/view-scores" exact={true}>
					<UserScores />
				</ProtectedRoute>
				<ProtectedRoute path="/leaderboards" exact={true}>
					<Leaderboards />
				</ProtectedRoute>
				<ProtectedRoute path="/games" exact={true}>
					<GamesDashboard />
				</ProtectedRoute>
				<ProtectedRoute path="/games/sudoku" exact={true}>
					<Sudoku />
				</ProtectedRoute>
				<ProtectedRoute path="/games/chess" exact={true}>
					<Chess />
				</ProtectedRoute>
				<ProtectedRoute path="/games/game-of-life" exact={true}>
					<GameOfLife />
				</ProtectedRoute>
				<ProtectedRoute path="/games/go" exact={true}>
					<Go />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
