import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser } from "../../store/session";

function User() {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();
	const [showDelete, setShowDelete] = useState(false);

	return (
		<div className="account-background">
			<div className="account-container">
				{!showDelete && (
					<>
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
							<button onClick={() => setShowDelete(true)}>
								Delete Account
							</button>
						</div>
					</>
				)}
				{showDelete && (
					<>
						<p id="delete-user">
							Are you sure you want to delete your account?
						</p>
						<div className="account-buttons">
							<button onClick={() => setShowDelete(false)}>
								Cancel
							</button>
							<button
								id="delete-user"
								onClick={() => dispatch(deleteUser(user.id))}
							>
								Confirm
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
export default User;
