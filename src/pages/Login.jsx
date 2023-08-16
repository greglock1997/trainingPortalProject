import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsLoggedIn }) {
  // Set default state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle username and password changes in input form
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); 
  }

  const handleSubmit = () => { 
    if ((username === "Foxglove") && (password === "Energy")) {
        setIsLoggedIn(true);
        navigate('/dashboard');
    } else {
      console.log("INCORRECT")
    }
  }

  return (
    <div className="login-container">
      <img src="../src/assets/images/logo.png" alt="" />
      <h1>Welcome to your OTM Training and Education Portal </h1>
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