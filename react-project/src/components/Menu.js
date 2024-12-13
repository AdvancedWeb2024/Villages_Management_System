import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <ul className="menu">
      <li><Link to="/overview">Overview</Link></li>
      <li><Link to="/village-mgt">Village Management</Link></li>
      <li><Link to="/chat">Chat</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
    </ul>
  );
}

export default Menu;
