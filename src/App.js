import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import "./App.css";
import { Outlet } from "react-router-dom";
import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";
import { validateUser } from "./Api/api";

function App() {
	const [userToken, setUserToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(false);
	const [user, setUser] = useState(null);
	const [isVerified, setIsVerified] = useState(false);

	useEffect(() => {
		const token = getUserToken();
		//null or the actual token
		setUserToken(token);
	}, [refreshToken]);

	useEffect(() => {
		const verifyUser = async () => {
			const verifyResult = await validateUser(userToken);
			if (verifyResult.success) {
				setUser(verifyResult.email);
				setIsVerified(true);
			} else {
				removeUserToken();
				setIsVerified(false);
				setUser(null);
			}
		};
		if (userToken) verifyUser();
	}, [userToken]);

	return (
		<div className="App">
			<NavBar
				user={user}
				isVerified={isVerified}
				setRefreshToken={setRefreshToken}
				setUser={setUser}
				setIsVerified={setIsVerified}
			/>
			<Outlet context={{ setRefreshToken, isVerified, userToken }} />
		</div>
	);
}

export default App;