import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SplashPage from "./components/SplashPage/";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import NavBar from "./components/Navigation/";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Leaderboards from "./components/Leaderboards"
import { authenticate } from "./store/session";
import UserScores from "./components/UserScores";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

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
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/user-scores" exact={true}>
          <UserScores />
        </ProtectedRoute>
        <ProtectedRoute path="/leaderboards" exact={true}>
          <Leaderboards />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
