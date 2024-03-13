/* import React, {useState} from "react";


//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	

	return (
		<div className="container">
		 <h1>to do list </h1>
		 <ul>
			<li>
				<input type="text" 
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyPress={(e) => e.keyCode == 13 ? setTodos (todos.concat(inputValue)) : null}
				placeholder="what do you have to do?" />
			</li>
			<li>have lunch</li>
			<li>got to the gym</li>
			<li>read</li>
			<li>colorgrading</li>
		 </ul>
		 <div className="tasksLeft">
			7 tasks left
		 </div>
		</div>
	);
};

export default Home; */

import React, { useState } from 'react';

function TodoList() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');

  
	const addTask = () => {
	  if (newTask.trim() !== '') {
		setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
		setNewTask('');
	  }
	};
  
	const toggleTask = id => {
	  const updatedTasks = tasks.map(task =>
		task.id === id ? { ...task, completed: !task.completed } : task
	  );
	  setTasks(updatedTasks);
	};
  
	const removeTask = id => {
	  const updatedTasks = tasks.filter(task => task.id !== id);
	  setTasks(updatedTasks);
	};
  
	return (
	  <div className="container">
		<h1>to do list</h1>
		<input
		  type="text"
		  placeholder="Add a new task"
		  value={newTask}
		  onChange={e => setNewTask(e.target.value)}
		/>
		<button id="btn" onClick={addTask}>Add Task</button>
		<ul class="list-group">

		  {tasks.map(task => (
			<li key={task.id} id='task'>
				<input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" onChange={() => toggleTask(task.id)}></input>
			  <span className={task.completed ? 'completed' : ''}>{task.text}</span>
			  {task.completed && ( // El botón se muestra solo si la tarea está completada
              <button onClick={() => removeTask(task.id)}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
					<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
				</svg>
              </button>
            )}
               
            
			   
			 	 
			
				
				
			  
			</li>
		  ))}
		</ul>
		<div className="tasksLeft">
			{tasks.length} tasks left
		 </div>
	  </div>
	);
  }
  

export default TodoList;
