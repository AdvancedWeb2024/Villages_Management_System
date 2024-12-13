import React from 'react';
import Menu from './Menu';
import User from './User';
import { useLocation } from 'react-router-dom';
import '../styles/main.css';

function Sidebar({ role }) {
  const location = useLocation();

  
  const titles = {
    '/overview': 'Overview',
    '/village-mgt': 'Village Management',
    '/chat': 'Chat',
    '/gallery': 'Gallery',
  };

  const title = titles[location.pathname] || 'Dashboard';

  return (
    <div className="sidebar">
      <div className="top" id="top-header">{title}</div>
      {/* Pass the role to the Menu component */}
      <Menu role={role} />
      <User />
    </div>
  );
}

export default Sidebar;

