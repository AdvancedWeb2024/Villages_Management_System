
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './styles/main.css'; 
import './styles/style.css';
function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<MainContent />} />
            
            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
