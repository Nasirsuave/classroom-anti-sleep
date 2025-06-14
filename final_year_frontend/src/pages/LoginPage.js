// src/pages/LoginPage.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // const handleLogin = () => {
//   //   // In a real app, you'd send credentials to your Django backend,
//   //   // get a token back, and store it (e.g., in localStorage)
//   //   console.log("Attempting to log in...");
//   //   localStorage.setItem('userToken', 'my-dummy-jwt-token'); // Store a dummy token
//   //   navigate('/dashboard'); // Redirect to dashboard after successful login
//   // };

//   return (
//     <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#add8e6', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//       <h2>Login Page</h2>
//       <p>Welcome! Please log in to access your anti-sleep dashboard.</p>
//       <button onClick={login} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white' }}>
//         Login (Simulated)
//       </button>
//       <p style={{ marginTop: '10px', fontSize: '12px' }}>
//         (In a real app, you'd have input fields for username/password)
//       </p>
//     </div>
//   );
// }


// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth(); // login(token) from context
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and mark user as authenticated
        login(data.access); // Calls your context function
        localStorage.setItem("refresh_token", data.refresh); // Optional
      } else {
        setMessage(data.detail || 'Invalid credentials');
      }
    } catch (error) {
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#add8e6', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Login</h2>
      <p>Enter your credentials to access your dashboard</p>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;


