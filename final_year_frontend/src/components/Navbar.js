// src/components/Navbar.js
import React from 'react';
import { Link, useBeforeUnload, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth()

  //the handleLogout function doesn't change the value of the state of isAuthenticated so it is always true and the Navbar be always be displayed even when you logout

  // const handleLogout = () => {
  //   // In a real app, this would clear auth tokens (e.g., from localStorage)
  //   console.log("Logging out...");
  //   localStorage.removeItem('userToken'); // Example: remove a dummy token
  //   navigate('/login'); // Redirect to login page
  
  // };


  return (
    <nav style={{ background: '#333', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Anti-Sleep App</h1>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
        <li style={{ marginLeft: '20px' }}><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
        <li style={{ marginLeft: '20px' }}><Link to="/heatmaps" style={{ color: 'white', textDecoration: 'none' }}>Heatmaps</Link></li>
        <li style={{ marginLeft: '20px' }}><Link to="/report" style={{ color: 'white', textDecoration: 'none' }}>Report</Link></li>
        <li style={{ marginLeft: '20px' }}><button onClick={logout} style={{ background: 'none', border: '1px solid white', color: 'white', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;