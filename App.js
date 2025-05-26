import React from 'react';
import Sidebar from './components/Sidebar';
import TicketCenter from './components/TicketCenter';
import './App.css'; // For overall layout

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TicketCenter />
      </div>
    </div>
  );
}

export default App;