import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from "../../images/logo.png";
import "./Navigation.css";
import { useSelector } from "react-redux";

const NavBar = ({ loaded }) => {
  const user = useSelector((state) => state.session.user);
  const [hoverTitle, setHoverTitle] = useState(false);

  let sessionLinks;
  if (user) {
    sessionLinks = <ProfileButton user={user} />;
  } else {
    sessionLinks = (
      <>
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
      </>
    );
  }

  return (
    <nav>
      <div className="navbar navbar-top">
        <div className="navbar-top__logo">
          <NavLink to="/" exact={true} activeClassName="active">
            <img
              src={logo}
              alt="logo containing go, chess, and sudoku pieces"
              style={{ height: "100px", width: "100px" }}
            />
          </NavLink>
        </div>
        <div className="navbar-top__buttons">{loaded && sessionLinks}</div>
      </div>
      <div className="navbar navbar-bottom">
        <NavLink to="/" exact={true} activeClassName="active">
          <h1
            className="navbar-bottom__title"
            onMouseEnter={() => setHoverTitle(true)}
            onMouseLeave={() => setHoverTitle(false)}
          >
            {hoverTitle ? "[[Board, Games]]" : "Board Games"}
          </h1>
        </NavLink>
        <NavLink to="/games" exact={true} activeClassName="active">
          <p className="navbar-bottom__games">GAMES</p>
        </NavLink>
        <NavLink to="/leaderboards" exact={true} activeClassName="active">
          <p className="navbar-bottom__leaderboard">LEADERBOARDS</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
