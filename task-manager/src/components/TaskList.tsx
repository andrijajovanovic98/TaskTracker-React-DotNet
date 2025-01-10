import React from 'react';
import TaskItem from './TaskItem.tsx';

interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

const TaskList: React.FC<{ 
  tasks: Task[]; 
  onToggleComplete: (id: number) => void; 
  onDeleteTask: (id: number) => void; 
}> = ({ tasks, onToggleComplete, onDeleteTask }) => {
  return (
    <div>
      <h2 className="gatya">Task List</h2>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onDeleteTask={onDeleteTask} 
        />
      ))}
    </div>
  );
};

export default TaskList;
