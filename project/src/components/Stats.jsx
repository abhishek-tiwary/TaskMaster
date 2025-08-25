import React from 'react';

const Stats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;
  const overdueTasks = tasks.filter(task => {
    if (task.completed || !task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-number">{totalTasks}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{activeTasks}</div>
        <div className="stat-label">Active</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{completedTasks}</div>
        <div className="stat-label">Completed</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{completionRate}%</div>
        <div className="stat-label">Progress</div>
      </div>

      {highPriorityTasks > 0 && (
        <div className="stat-card stat-warning">
          <div className="stat-number">{highPriorityTasks}</div>
          <div className="stat-label">High Priority</div>
        </div>
      )}

      {overdueTasks > 0 && (
        <div className="stat-card stat-danger">
          <div className="stat-number">{overdueTasks}</div>
          <div className="stat-label">Overdue</div>
        </div>
      )}
    </div>
  );
};

export default Stats;