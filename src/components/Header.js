// src/components/Header.js
import React from 'react';
import './Header.css'; // Ensure this file exists and is properly linked
import Bot_Logo from './Bot_Logo.svg'
function Header() {
  return (
    <header className="header d-flex align-items-center p-3 text-white">
      <div className="logo-container d-flex align-items-center">
        <img src={Bot_Logo} alt="Logo" className="logo" /> {/* Update with your logo path */}
        <h1><strong>IP Guardian</strong></h1>
      </div>
      <h1 className="app-name ms-auto">Morgan Stanley</h1>
    </header>
  );
}

export default Header;
