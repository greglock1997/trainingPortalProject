import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsLoggedIn }) {
  // Set default state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle username and password changes in input form
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); 
  }

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username, password});
      if (response.status === 200) {
        console.log("Login successful")
      } else {
        console.error("Login failed")
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleSubmit = () => {
    // Prevents page refresh in the event of invalid login details
    event.preventDefault();
    
    if ((username === "Foxglove") && (password === "Energy")) {
      setIsLoggedIn(true);

      /* POST ROUTE TEST */
      handleLogin();
      navigate('/dashboard');
    } else {
      setMessage('Invalid login credentials');
    }
  }

  return (
    <div className="login-container">
      <img src="../src/assets/images/logo.png" alt="" />
      {message ? (
        <h1>{message}</h1>
      ) : (
        <h1>Welcome to your OTM Training and Education Portal</h1>
      )}
      <div className="login-form-container">
        <h2>LOGIN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username"/>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}