import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [method, setMethod] = useState("POST");
	const history = useHistory();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const res = await dispatch(
				signUp(username, email, password, method)
			);
			if (!res.errors) history.push("/");
		} else {
			setErrors(["Passwords must match"]);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	useEffect(() => {
		if (user) {
			setUsername(user.username);
			setEmail(user.email);
			setMethod("PATCH");
		}
	}, [user]);

	return (
		<div className="form-outer-container">
			<div className="form-inner-container">
				<form onSubmit={onSignUp}>
					<div className="errors">
						{errors.map((error) => (
							<div>{error}</div>
						))}
					</div>
					<div>
						<input
							type="text"
							name="username"
							placeholder="Username"
							onChange={updateUsername}
							value={username}
						></input>
					</div>
					<div>
						<input
							type="text"
							name="email"
							placeholder="Email"
							onChange={updateEmail}
							value={email}
						></input>
					</div>
					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={updatePassword}
							value={password}
						></input>
					</div>
					<div>
						<input
							type="password"
							name="repeat_password"
							placeholder="Confirm Password"
							onChange={updateRepeatPassword}
							value={repeatPassword}
							required={true}
						></input>
					</div>
					<div className="button-container">
						<button type="submit">
							{method === "POST" ? "Sign Up" : "Update Account"}
						</button>
					</div>
					{method === "POST" && (
						<div className="navlink-container">
							<NavLink className="sign-up__navlink" to="login">
								Already have an account?
							</NavLink>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
