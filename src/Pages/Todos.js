import React from "react";
import { useOutletContext } from "react-router-dom";
import TodoCard from "../Components/TodoCard";

const Todos = () => {
	const { todos, handleDelete, handleEdit } = useOutletContext();
	return (
		<div
			style={{ display: "flex", justifyContent: "start", alignItems: "start" }}
		>
			<table style={{ width: "60%", margin: "0px 30px" }}>
				<tr style={{ textAlign: "start" }}>
					<th></th>
					<th>Todo:</th>
					<th>Priority</th>
					<th></th>
				</tr>
				<tr style={{ margin: "5px", textAlign: "start" }}></tr>
				{todos.map((todo) => {
					return (
						<TodoCard
							key={todo._id}
							todo={todo}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
						/>
					);
				})}
			</table>
		</div>
	);
};

export default Todos;