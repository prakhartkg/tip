// src/components/Header.js
import React from 'react';
import './Header.css'; // Ensure this file exists and is properly linked

function Header() {
  return (
    <header className="header d-flex align-items-center p-3 text-white">
      <div className="logo-container d-flex align-items-center">
        <img src="/path-to-your-logo.png" alt="Logo" className="logo" /> {/* Update with your logo path */}
      </div>
      <h1 className="app-name ms-auto">Morgan Stanley</h1>
    </header>
  );
}

export default Header;
