import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message.jsx'

export default function Register() {
  // Set default message
  const [message, setMessage] = useState('');

  // Function for deleting error message
  const deleteMessage = () => {
    setMessage('');
  }

  // Reset login status
  useEffect(() => {
    axios.post('/logout');
  }, []);

  // Set valid status
  const [isRegistered, setIsRegistered] = useState(false);

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
    // Prevents page refresh
    event.preventDefault();
    
    if ((username === confirmUsername) && (password === confirmPassword)) {
        const response = await axios.post('/register', { username, password});
        const status = response.data.status;
        if (status === 200) {
          setIsRegistered(true);
        } else if (status === 409){
          setMessage(response.data.message);
        } else {
          console.log("Undefined Error");
        }
    } else if (username === confirmUsername) {
      setMessage('Passwords do not match')
    } else if (password === confirmPassword) {
      setMessage('Usernames do not match')
    } else {
      setMessage('Usernames and passwords do not match')
    }
  };

  if (isRegistered === true) {
    return <Navigate to="/login" />
  }

  return (
    <div className="register-container">
      {message && <Message message={message} deleteMessage={deleteMessage}/> }
      <div className="register-form-container">
        <h2>REGISTER</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            minLength={5}
            maxLength={20} 
            type="text"
            value={username} 
            onChange={handleUsernameChange} 
            placeholder="Username"
          />
          <input
            minLength={5} 
            maxLength={20}
            type="text" value={confirmUsername}
            onChange={handleConfirmUsernameChange} 
            placeholder="Confirm Username"
          />
          <input
            minLength={5}
            maxLength={20} 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password"
            required
          />
          <input
            minLength={5}
            maxLength={20} 
            type="password" 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            placeholder="Confirm Passwords"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}