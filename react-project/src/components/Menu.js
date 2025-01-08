import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu({ role }) {
  return (
    <ul className="menu">
      {/* Overview link is always visible */}
      <li>
        <NavLink to="/overview" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Overview
        </NavLink>
      </li>

      {/* Conditionally render Village Management link based on user role */}
      {role === 'admin' && (
        <li>
          <NavLink to="/village-mgt" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Village Management
          </NavLink>
        </li>
      )}

      {/* Chat link is always visible */}
      <li>
        <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Chat
        </NavLink>
      </li>

      {/* Gallery link is always visible */}
      <li>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Gallery
        </NavLink>
      </li>
    </ul>
  );
}

export default Menu;
