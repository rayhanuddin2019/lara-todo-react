import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from "./axiosConfig";

// Set the token in Axios globally
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token'); // Replace with the actual storage location of your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', body: '' });
  const [error, setError] = useState('');
  const [editTaskId, setEditTaskId] = useState(null); // Track task being edited

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${window.Laravel.appUrl}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    if (!newTask.title || !newTask.body) {
      setError('Title and body are required');
      return;
    }

    try {
      let response;
      if (editTaskId) {
        // Update existing task
        response = await axios.put(`${window.Laravel.appUrl}/api/tasks/${editTaskId}`, newTask);
        setTasks(tasks.map((t) => (t.id === editTaskId ? response.data : t))); // Update in the list
        setEditTaskId(null); // Reset edit mode
      } else {
        // Add new task
        response = await axios.post(`${window.Laravel.appUrl}/api/tasks`, newTask);
        setTasks([...tasks, response.data]); // Add to the list
      }

      setNewTask({ title: '', body: '' });
      setError('');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const toggleCompletion = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`${window.Laravel.appUrl}/api/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${window.Laravel.appUrl}/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask({ title: taskToEdit.title, body: taskToEdit.body });
    setEditTaskId(taskId); // Set the task being edited
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {error && <div className="error">{error}</div>}

      <div className="task-input">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
        />
        <textarea
          name="body"
          value={newTask.body}
          onChange={handleInputChange}
          placeholder="Task Description"
        />
        <button onClick={addTask}>{editTaskId ? 'Update Task' : 'Add Task'}</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.body}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleCompletion(task.id)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
              </button>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;

if (document.getElementById('todoApp')) {
  const Index = ReactDOM.createRoot(document.getElementById("todoApp"));
  Index.render(
    <React.StrictMode>
      <TodoApp />
    </React.StrictMode>
  );
}
