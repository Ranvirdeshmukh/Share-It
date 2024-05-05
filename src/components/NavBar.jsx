import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <img src="public/Chocolate minimalist master kitchen logo-2.png" alt="Logo" />
      </div>
      <div className="nav-links">
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
          Home
        </NavLink>
        <NavLink to="/recipes/new" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
          New Recipe
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
