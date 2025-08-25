import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      ...taskData
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed) ||
      (filter === 'high' && task.priority === 'high') ||
      (filter === 'medium' && task.priority === 'medium') ||
      (filter === 'low' && task.priority === 'low');

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const categories = [...new Set(tasks.map(task => task.category))];

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <Stats tasks={tasks} />
          
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            onNewTask={() => setShowTaskForm(true)}
          />

          {showTaskForm && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? 
                (updates) => updateTask(editingTask.id, updates) : 
                addTask
              }
              onCancel={handleCancelEdit}
            />
          )}

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskComplete}
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />

          {filteredTasks.length === 0 && tasks.length > 0 && (
            <div className="empty-state">
              <h3>No tasks match your current filters</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="empty-state">
              <h3>No tasks yet</h3>
              <p>Create your first task to get started</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowTaskForm(true)}
              >
                Create Task
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;