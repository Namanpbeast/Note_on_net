import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck, FaUndo } from 'react-icons/fa'; // Importing icons
import './Todo.css';  // Import the CSS file

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/todos', {
          headers: {
            'auth-token': token
          }
        });
        setTodos(response.data);
      } catch (error) {
        console.error("There was an error fetching todos!", error);
      }
    };

    fetchTodos();
  }, []);

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/todos', 
        { task: newTask },
        { headers: { 'auth-token': token } }
      );

      setTodos([...todos, response.data]);
      setNewTask('');
    } catch (error) {
      console.error("There was an error adding a todo!", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`, {}, {
        headers: { 'auth-token': token }
      });

      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error("There was an error toggling todo completion!", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { 'auth-token': token }
      });

      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("There was an error deleting the todo!", error);
    }
  };

  return (
    <div className="todo-container">
      <h1>Your To-Do List</h1>
      <div className="todo-input">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>
          <FaPlus /> {/* Add icon */}
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <span className={todo.completed ? 'completed-task' : ''}>
              {todo.task}
            </span>
            <div className="todo-actions">
              <button className="complete-button" onClick={() => toggleComplete(todo._id)}>
                {todo.completed ? <FaUndo /> : <FaCheck />} {/* Toggle icons for completion */}
              </button>
              <button className="delete-button" onClick={() => deleteTask(todo._id)}>
                <FaTrash /> {/* Delete icon */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
