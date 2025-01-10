import React from 'react';

interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

const TaskItem: React.FC<{ 
  task: Task; 
  onToggleComplete: (id: number) => void; 
  onDeleteTask: (id: number) => void; 
}> = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.isComplete ? 'Complete' : 'Incomplete'}</p>
      <button onClick={() => onToggleComplete(task.id)}>
        {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
