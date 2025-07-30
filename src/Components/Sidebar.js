import './../Styles/Sidebar.css';
import logo from './edp_logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

  return (
    <aside className="sidebar">
        <div className="sidebar-header">
          <div className="app-name">
            <img src={logo} className='logo'/>
            <p className = 'sidebar-subtitle'>Inventory System</p>
          </div>
        </div>
        <nav className="nav-links">
          <Link to="/">Inventory</Link>
        </nav>
    </aside>
    )

}
export default Sidebar;