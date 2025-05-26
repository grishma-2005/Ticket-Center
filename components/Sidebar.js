import React from 'react';
import './Sidebar.css'; // Create this CSS file
// Assuming you have a logo image in the public folder
import logo from "./dsedify-logo.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="DSEdify Logo" style={{ maxWidth: '150px' }} />
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">Trainees</li>
        <li className="sidebar-menu-item">Payments</li>
        <li className="sidebar-menu-item active">Ticket Center</li>
        <li className="sidebar-menu-item">FAQs</li>
        {/* Add other menu items */}
      </ul>
      {/* Add any other sidebar content */}
    </div>
  );
}

export default Sidebar;