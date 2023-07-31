import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPenToSquare,
	faTrashCan,
	faRectangleXmark,
	faCheckSquare,
} from "@fortawesome/free-regular-svg-icons";

const TodoCard = ({ todo, handleDelete, handleEdit }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [completed, setCompleted] = useState(null);
	const [selectedEdit, setSelectedEdit] = useState(false);

	useEffect(() => {
		setTitle(todo.title);
		setDescription(todo.description);
		setPriority(todo.priority);
		setCompleted(todo.completed);
	}, [todo]);
	const deleteButton = () => {
		//calls the handleDelete from the props and passes in the id
		handleDelete(todo._id);
	};

	const handleOnComplete = () => {
		handleEdit(todo._id, { completed: !completed });
	};

	const handleEditSubmit = () => {
		const data = {
			title,
			description,
			priority,
		};
		handleEdit(todo._id, data);
		setSelectedEdit(false);
	};
	// You will probably need several states to help with this.
	// add a state that is boolean, for changing the title, descript and priority to input
	// two functions, one handles the checkbox and one handles the edit with the text input
	return (
		<tr style={{ margin: "5px", textAlign: "start" }}>
			{selectedEdit ? (
				<>
					<td></td>
					<td>
						{" "}
						Title:
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>{" "}
						Description:
						<input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</td>
					<td>
						<select
							value={priority}
							onChange={(e) => setPriority(e.target.value)}
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</td>
					<td>
						<FontAwesomeIcon icon={faCheckSquare} onClick={handleEditSubmit} />
						<FontAwesomeIcon
							icon={faRectangleXmark}
							onClick={() => setSelectedEdit(false)}
						/>
					</td>
				</>
			) : (
				<>
					<td>
						<input
							type="checkbox"
							defaultChecked={completed}
							onClick={handleOnComplete}
						/>
					</td>
					<td>
						{title}: {description}
					</td>
					<td>{priority}</td>
					<td>
						<FontAwesomeIcon
							icon={faPenToSquare}
							onClick={() => setSelectedEdit(true)}
						/>
						<FontAwesomeIcon icon={faTrashCan} onClick={deleteButton} />
					</td>
				</>
			)}
		</tr>
	);
};

export default TodoCard;