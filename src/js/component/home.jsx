import React, { useEffect, useState } from 'react';

function TodoList() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');

//----------------------------------------------------------- API -------------------------------------------------
	const getInfo = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/dreisup',{
			method: "GET",
		})
		.then(resp => {
			console.log(resp.ok);      // Will be true if the response is successful
			console.log(resp.status);  // The status code=200 or code=400 etc.
			if (resp.status === 404){
				console.log("creando nuevo usuario");
				addUser();}
			return resp.json();        // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
		})
		.then(data =>{
			console.log(data);
			setTasks(data);
		})
		.catch(error => {
			console.log(error);
		});
	}

	const addUser = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/dreisup',{
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}		
		})
		.then(resp => {
			console.log(resp.ok);      // Will be true if the response is successful
			console.log(resp.status);  // The status code=200 or code=400 etc.
			console.log(resp.text());  // Will try to return the exact result as a string
			
		}) 
		.then(data => {
			// Here is where your code should start after the fetch finishes
			console.log(data);         // This will print on the console the exact object received from the server
		})
		.catch(error => {
			// Error handling
			console.log(error);
		});
	}

	const updateInfo = (task) => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/dreisup',{
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp)
			return resp.json();
		})
		.then(data => {
			console.log(data);
		}) 
		.catch(error => {
			console.log(error,"damn")
		});
	}

	const deleteInfo = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/dreisup', {
		  method: 'DELETE',
		  body: JSON.stringify(tasks),
		  headers: {
			'Content-Type': 'application/json'
		  }
		})
		  .then(resp => {
			console.log(resp.status);
			if (resp.status === 200) {
			  console.log('Eliminación de tareas exitosa');
			  createUser(); // No estoy seguro de qué hace esta función, asegúrate de que sea necesaria aquí
			  setTasks([]);
			}
			return resp.json(); // Esto puede no ser necesario, dependiendo de lo que haga createUser()
		  })
		  .then(data => {
			console.log(data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	  };

	//--------------------------------------------------------------API-------------------------------


	const addTask = () => {
		if (newTask.trim() !== '') {
		  const taskToAdd = { label: newTask, done: false }; // Crear el objeto con las propiedades requeridas
		  setTasks([...tasks, taskToAdd]);
		  updateInfo([...tasks, taskToAdd]);
		  setNewTask('');
		}
	  };
	  
	const toggleTask = id => {
	  const updatedTasks = tasks.map(task =>
		task.id === id ? { ...task, done: !task.done } : task
	  );
	  setTasks(updatedTasks);
	};
  
	const removeTask = id => {
		const updatedTasks = tasks.filter(task => task.id !== id);
		setTasks(updatedTasks);
		updateInfo(updatedTasks);
	  };

	
		useEffect(()=>{
			getInfo();
		},[])
	
		/* useEffect(()=>{
			updateInfo();
		},[tasks]) */
	
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
		<ul className="list-group">

		  {tasks.map((task, index) => (
			
				<li key={index} id='task'>
					{console.log(task)}
					<input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" onChange={() => toggleTask(task.id)}></input>
				<span className={task.done ? 'done' : ''}>{task.label}</span>
				{task.done && ( // El botón se muestra solo si la tarea está completada
				<button onClick={() => removeTask(task.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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
