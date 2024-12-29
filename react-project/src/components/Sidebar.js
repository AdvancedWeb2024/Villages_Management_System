import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import User from './User';
import { useLocation } from 'react-router-dom';
import '../styles/main.css';

function Sidebar({ role }) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800);
  const location = useLocation();

  const titles = {
    '/overview': 'Overview',
    '/village-mgt': 'Village Management',
    '/chat': 'Chat',
    '/gallery': 'Gallery',
  };

  const title = titles[location.pathname] || 'Dashboard';

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 863);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle the sidebar when the hamburger button is clicked
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div className={`sidebar ${isSidebarActive ? 'is-active' : ''}`}>
      {isSmallScreen && (
        <div className="menu-toggle" onClick={toggleSidebar}>
          <div className="hamburger">
            <span></span>
          </div>
        </div>
      )}
      <div className="top" id="top-header">{title}</div>
      {/* Pass the role to the Menu component */}
      <Menu role={role} />
      <User />
    </div>
  );
}

export default Sidebar;
