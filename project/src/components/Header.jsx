import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">✓</span>
            TaskMaster
          </h1>
          <p className="tagline">Organize your work, achieve your goals</p>
        </div>
      </div>
    </header>
  );
};

export default Header;