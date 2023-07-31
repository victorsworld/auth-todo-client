import React, { useState } from 'react';
import { registerUser } from '../Api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		const registerResult = await registerUser(data);
		console.log("register", registerResult);
		if (registerResult.success) {
			//reset all the state to empty string
			setEmail("");
			setPassword("");
			//navigate to login
			navigate("/login");
		}
	};
	return (
		<div>
			<h2>Register</h2>
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
				<button>Register</button>
			</form>
		</div>
	);
};

export default Register;

// build the register and login form, does not have to work yet