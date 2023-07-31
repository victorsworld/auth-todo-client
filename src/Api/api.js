import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

// create a register function that accepts user data object and makes an api post fetch call to our server to create a new user
const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${baseUrl}/users/register`, userData);
		const data = await response.data;
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};

//create a login function that accepts user data object and makes an api post fetch call to our server to log in. return the data

const loginUser = async (userData) => {
	try {
		const response = await axios.post(`${baseUrl}/users/login`, userData);
		const data = await response.data;
		return data;
	} catch (error) {
		return error.response.data;
	}
};

const validateUser = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/users/validate`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.data;
		return data;
	} catch (error) {
		return error.response.data;
	}
};

const addTodo = async (token, todoData) => {
	try {
		const response = await axios.post(
			`${baseUrl}/todos/create-todo`,
			todoData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.data;
		return data;
	} catch (error) {
		return error.response.data;
	}
};

const getAllTodos = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/todos/all-todos`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.data;
		return data;
	} catch (error) {
		return error.response.data;
	}
};

const deleteTodo = async (token, id) => {
	try {
		const response = await axios.delete(`${baseUrl}/todos/delete-todo/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.data;
		return data;
	} catch (error) {
		return error.response.data;
	}
};

const editTodo = async (token, id, editInfo) => {
	try {
		const response = await axios.put(
			`${baseUrl}/todos/edit-todo/${id}`,
			editInfo,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.data;
		return data;
	} catch (error) {
		return error.response.data;
	}
};

export {
	registerUser,
	loginUser,
	validateUser,
	addTodo,
	getAllTodos,
	deleteTodo,
	editTodo,
};