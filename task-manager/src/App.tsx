import React, { useState, useEffect } from 'react';
import api from './api.ts';
import TaskList from './components/TaskList.tsx';
import TaskForm from './components/TaskForm.tsx';
import './App.css'; 

interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/task').then((response) => {
      setTasks(response.data);
    });
  }, []); 

  const addTask = async (name: string) => {
    const newTask = { id: tasks.length + 1, name, isComplete: false };
  
    try {
      console.log('Sending task to backend:', newTask);
      const response = await api.post('/task', newTask);
      console.log('Response from backend:', response.data); 
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const toggleTaskCompletion = async (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, isComplete: !taskToUpdate.isComplete };

    try {
      console.log('Updating task in backend:', updatedTask); 
      const response = await api.put(`/task/${id}`, updatedTask);
      console.log('Response from backend:', response.data);

  
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/task/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Állapot frissítése
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      {}
      <TaskList tasks={tasks} onToggleComplete={toggleTaskCompletion} onDeleteTask={deleteTask} />    </div>
  );
};

export default App;
