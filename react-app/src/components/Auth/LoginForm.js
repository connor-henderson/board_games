import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data.errors) {
			setErrors(data.errors);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const demoLogin = (e) => {
		e.preventDefault();
		setEmail("demo@aa.io");
		setPassword("password");

		const loginButton = document.querySelector(".login-button");
		setTimeout(() => loginButton.click(), 300);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="form-container">
			<form onSubmit={onLogin}>
				<div className="errors">
					{errors.map((error) => (
						<div>{error}</div>
					))}
				</div>
				<div>
					<label htmlFor="email"></label>
					<input
						name="email"
						type="text"
						placeholder="Email"
						value={email}
						onChange={updateEmail}
					/>
				</div>
				<div>
					<label htmlFor="password"></label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={updatePassword}
					/>
				</div>
				<div className="login button-container">
					<button className="login-button" type="submit">
						Login
					</button>
				</div>
				<div className="demo-login button-container">
					<button type="submit" onClick={demoLogin}>
						Demo
					</button>
				</div>
				<div className="navlink-container">
					<NavLink className="sign-up__navlink" to="sign-up">
						Don't have an account yet?
					</NavLink>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
