import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function User() {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	return (
		<div className="account-container">
			<div className="account-info">
				<ul className="account">
					<li className="account">
						<strong>Username</strong> {user.username}
					</li>
					<li className="account">
						<strong>Email</strong> {user.email}
					</li>
				</ul>
			</div>
			<div className="account-buttons">
				<button onClick={() => history.push("/sign-up")}>
					Edit Account
				</button>
				<button>Delete Account</button>
			</div>
		</div>
	);
}
export default User;
