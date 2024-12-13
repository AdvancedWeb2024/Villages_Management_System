import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import User from './User';
import '../styles/main.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top" id="top-header">Dashboard</div>
      <Menu />
      <User />
    </div>
  );
}

export default Sidebar;
