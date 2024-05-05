import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
        Home
      </NavLink>
      <NavLink to="/recipes/new" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
        Add New Recipe
      </NavLink>
    </nav>
  );
}

export default NavBar;
