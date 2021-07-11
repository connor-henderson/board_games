import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../Auth/LogoutButton";
import "./Navigation.css";

function ProfileButton({ user }) {
	const [showMenu, setShowMenu] = useState(false);
	const userId = useSelector((state) => state.session.user.id);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<>
			<button onClick={openMenu} className="profile-button">
				{user.username}
			</button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li className="account">
						<a href={`/users/${userId}/account`}>Account</a>
					</li>
					<li className="view-scores">
						<a href={`/users/${userId}/scores`}>View scores</a>
					</li>
					<li className="logout">
						<LogoutButton />
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
