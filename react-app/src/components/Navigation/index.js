import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo from "../../assets/images/logo.png";
import "./Navigation.css";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar navbar-top">
        <div className="navbar-top__logo">
          <NavLink
            to="/"
            exact={true}
            activeClassName="active"
          >
            <img
              src={logo}
              alt="logo containing go, chess, and sudoku pieces"
              style={{ height: "90px", width: "90px" }}
            />
          </NavLink>
        </div>
        <div className="navbar-top__buttons">
          <div>
            <NavLink
              to="/login"
              exact={true}
              className="navbar-top__auth-login"
              activeClassName="active"
            >
              Sign in
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/sign-up"
              exact={true}
              className="navbar-top__auth-sign-up"
              activeClassName="active"
            >
              Get Started
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="navbar navbar-bottom">
        <NavLink to="/" exact={true} activeClassName="active">
          <h1 className="navbar-bottom__title">BoardGames</h1>
        </NavLink>
        <NavLink to="/games" exact={true} activeClassName="active">
          <p className="navbar-bottom__games">GAMES</p>
        </NavLink>
        <NavLink to="/leaderboard" exact={true} activeClassName="active">
          <p className="navbar-bottom__leaderboard">LEADERBOARDS</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
