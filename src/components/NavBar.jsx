import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink to="/">
          <img src="Chocolate minimalist master kitchen logo-2.png" alt="Logo" />
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="home-link" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
          Home
        </NavLink>
        <NavLink to="/recipes/new" className="new-recipe-link" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
          New Recipe
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
