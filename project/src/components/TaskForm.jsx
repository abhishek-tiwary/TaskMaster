import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || ''
      });
    }
    setErrors({});
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(formData);
    
    // Reset form if not editing
    if (!task) {
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        dueDate: ''
      });
      setErrors({});
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  return (
    <div className="task-form-overlay" onClick={handleOverlayClick}>
      <div className="task-form">
        <div className="form-header">
          <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className={errors.title ? 'error' : ''}
              required
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description (optional)..."
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Work, Personal, Study..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
            />
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;