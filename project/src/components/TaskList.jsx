import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (active tasks first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    // Finally by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;