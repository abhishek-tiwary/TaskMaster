import React, { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const isOverdue = () => {
    if (task.completed || !task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="checkbox"
        />
      </div>

      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div className="task-meta">
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
            {task.category && (
              <span className="category-badge">{task.category}</span>
            )}
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          {task.dueDate && (
            <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
              {isOverdue() && ' (Overdue)'}
            </span>
          )}
          
          <span className="created-date">
            Created {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className={`task-actions ${showActions ? 'visible' : ''}`}>
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;