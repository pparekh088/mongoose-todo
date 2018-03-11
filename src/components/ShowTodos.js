import React from "react";
import Todo from "./Todo";

const ShowTodos = props => {
	const { todos, removeTodo, completeTodo } = props;
	return (
		<ul className="ShowTodos">
			{todos.map((todo, i) => (
				<Todo 
					removeTodo={removeTodo} 
					completeTodo = {completeTodo}
					description={todo.description} 
					id={todo._id} 
					completed = {todo.completed}
					key={i} />
			))}
		</ul>
	);
};

export default ShowTodos;
