import React from 'react';
import { useState } from 'react';
import Message from '../components/Message.jsx'
import '../assets/styles/login.css'

export default function Register() {
  // Set default message
  const [message, setMessage] = useState('');

  // Set default state for username and password
  const [username, setUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle username and password changes in input form
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleConfirmUsernameChange = (event) => {
    setConfirmUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); 
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ((username == confirmUsername) && (password == confirmPassword)) {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        })
      } catch (error) {
        console.log('Error submitting form', error)
      }
    } else if (username == confirmUsername) {
      setMessage('Passwords do not match')
    } else if (password == confirmPassword) {
      setMessage('Usernames do not match')
    } else {
      setMessage('Usernames and passwords do not match')
    }
  }

  return (
    <div className="register-container">
      <Message message={message}/>
      <div className="register-form-container">
      <h2>REGISTER</h2>
      <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username"/>
          <input type="text" value={confirmUsername} onChange={handleConfirmUsernameChange} placeholder="Confirm Username"/>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Passwords"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}