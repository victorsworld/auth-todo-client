import React, { useState } from 'react';
import { loginUser } from '../Api/api';
import { setUserToken } from '../Auth/authLocalStorage';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setRefreshToken } = useOutletContext();
	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setRefreshToken(true);
		const data = {
			email,
			password,
		};
		const loginResult = await loginUser(data);
		if (loginResult.success) {
			setUserToken(loginResult.token);
			setEmail("");
			setPassword("");
			setRefreshToken(false);
			navigate("/todos");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleOnSubmit}>
				<label>Email:</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button>Login</button>
			</form>
		</div>
	);
};

export default Login;
