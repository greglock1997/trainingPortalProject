import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie';

import loginStyles from '../assets/styles/login.module.css';

export default function Login({ setIsLoggedIn }) {
  // Set default state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Set registration success message
  useEffect(() => {
    const registrationStatus = Cookies.get('registrationMessage');
    setSuccessMessage(registrationStatus);
    
    // Remove message after being used
    Cookies.remove('registrationMessage');
  }, []);

  // Set access denied message
  useEffect(() => {
    const accessMessage = Cookies.get('accessMessage');
    if (accessMessage) {
      setErrorMessage(accessMessage);
      Cookies.remove('accessMessage');
    }
  }, []);

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
        navigate('/unit-redesign');
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className={loginStyles['login-container']}>
      <img src="../src/assets/images/logo.png" alt="" />
      <div className={loginStyles['login-form-container']}>
        <form className={loginStyles['login-form']} onSubmit={handleLogin}>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" required/>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required/>
          <button type="submit">Login</button>
        </form>
        <button className={loginStyles['login-form-register-button']} onClick={() => navigate('/register')}>Register</button>
        <button className={loginStyles['reset-password-button']} onClick={() => navigate('/reset-password')}>Reset Password</button>
        {errorMessage && <div className={loginStyles['login-error-message-container']}>{errorMessage}</div>}
        {successMessage && <div className={loginStyles['login-success-message-container']}>{successMessage}</div>}
      </div>
    </div>
  )
}