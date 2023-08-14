import React from 'react'
import { useState } from 'react'
import '../assets/styles/login.css'

export default function Login() {
  // Set default state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hanlde username and password changes in input form
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); 
  }

  const handleSubmit = async (error) => {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        })
      } catch (error) {
        console.log('Error submitting form', error)
      }
    }

  return (
    <div className="login-container">
      <img src="OTMlogo.png" alt="" />
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