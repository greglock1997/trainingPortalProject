import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsLoggedIn }) {
  // Set default state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Reset login status
  useEffect(() => {
    axios.post('/logout');
  }, []);

  // Handle username and password changes in input form
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); 
  }

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { username, password });
      const status = response.data.status;
      if (status === 200) {
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        setMessage("User not recognised");
        console.log("User not recognised");
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

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
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username"/>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}