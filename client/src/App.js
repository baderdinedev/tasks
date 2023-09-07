// src/App.js
import React,{useState,useEffect} from 'react';
import TaskForm from './TaskForm';

function App() {
  const addTask = (newTask) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the new task
        setTasks([...tasks, data]); // Add the new task to the tasks array
      })
      .catch((error) => console.error('Error adding task:', error));
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks from your backend API
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const deleteTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        return response.json();
      })
      .then(() => {
        // Remove the deleted task from the tasks state
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
