import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const TodoForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("medium");

	const { createTodo } = useOutletContext();
	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const data = {
			title,
			description,
			priority,
		};
		const result = await createTodo(data);
		if (result) {
			setTitle("");
			setDescription("");
			setPriority("medium");
			navigate("/todos");
		}
	};

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<label>Title:</label>
				<input value={title} onChange={(e) => setTitle(e.target.value)} />
				<br />
				<label>Description:</label>
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<label>Priority:</label>
				<select value={priority} onChange={(e) => setPriority(e.target.value)}>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<br />
				<button>Add Todo</button>
			</form>
		</div>
	);

	//create the form and attach the value with the state and onChange with the dedicated state setter function

	//use select option for priority
};

export default TodoForm;