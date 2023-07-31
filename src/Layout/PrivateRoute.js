import React, { useState, useEffect } from "react";
import TodoNav from "../Components/TodoNav";
import { Outlet, useOutletContext } from "react-router-dom";
import { addTodo, getAllTodos, deleteTodo, editTodo } from "../Api/api";

const PrivateRoute = () => {
	const [todos, setTodos] = useState([]);
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const { isVerified, userToken } = useOutletContext();

	useEffect(() => {
		const getTodos = async () => {
			const todosResponse = await getAllTodos(userToken);
			if (todosResponse.success) {
				setTodos(todosResponse.data);
			}
		};

		if (isVerified && userToken) getTodos();
	}, [isVerified, userToken, shouldRefetch]);

	const createTodo = async (data) => {
		setShouldRefetch(true);
		const createResult = await addTodo(userToken, data);
		setShouldRefetch(false);
		return createResult.success;
	};
	const handleDelete = async (id) => {
		setShouldRefetch(true);
		const deleteResponse = await deleteTodo(userToken, id);
		if (deleteResponse.success) {
			setShouldRefetch(false);
			console.log(deleteResponse);
		}
	};
	const handleEdit = async (id, data) => {
		setShouldRefetch(true);
		const editResponse = await editTodo(userToken, id, data);
		if (editResponse.success) {
			setShouldRefetch(false);
		}
	};

	return (
		<div>
			PrivateRoute
			{isVerified && (
				<>
					<TodoNav />
					<Outlet context={{ createTodo, todos, handleDelete, handleEdit }} />
				</>
			)}
		</div>
	);
};

export default PrivateRoute;