import React from 'react';

const FilterBar = ({ 
  filter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories,
  onNewTask 
}) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' },
    { key: 'medium', label: 'Medium Priority' },
    { key: 'low', label: 'Low Priority' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-buttons">
        {filters.map(filterOption => (
          <button
            key={filterOption.key}
            className={`filter-btn ${filter === filterOption.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filterOption.key)}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      <button className="btn btn-primary new-task-btn" onClick={onNewTask}>
        + New Task
      </button>
    </div>
  );
};

export default FilterBar;