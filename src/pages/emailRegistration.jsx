import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import registerStyles from '../assets/styles/register.module.css';

// Generate random confirmation code
function generateConfirmationCode() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      
    return randomNumber
}
      
const confirmationCode = generateConfirmationCode();

export default function EmailRegister() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationCodeInput, setConfirmationCodeInput] = useState('');
    const [currentPage, setCurrentPage] = useState('form')
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    // Handle username and password changes in input form
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleConfirmEmailChange = (event) => {
        setConfirmEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value); 
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleConfirmationCodeInputChange = (event) => {
        setConfirmationCodeInput(event.target.value);
    }

    const handleSubmit = async (event) => {
        // Form page
        if (currentPage === 'form') {
            // Prevents page refresh
            event.preventDefault();
            if ((email === confirmEmail) && (password === confirmPassword)) {
                    console.log("Valid details")
                    const response = axios.post('/check-user', { username: email });
                    const data = (await response).data;
                if (data.status === 200) {
                    setCurrentPage('confirmation');
                    axios.post('/signup-email', { email, confirmationCode});
                } else if (data.status === 409) {
                    setMessage('User already registered');
                }
            } else if (email === confirmEmail) {
                setMessage('Passwords do not match')
            } else if (password === confirmPassword) {
                setMessage('Emails do not match')
            } else {
                setMessage('Emails and passwords do not match')
            }
        // Confirmation code page
        } else if (currentPage === 'confirmation') {
            if (confirmationCode == confirmationCodeInput) {
                axios.post('/register-user', { username: email, password})
            } else {
                setMessage('Confirmation code incorrect')
            }
        }
    };

    return (
        <div className={registerStyles['register-container']}>
            <img src="../src/assets/images/logo.png" alt="" />
            {currentPage === 'form' ? (
            <>
                <div className={registerStyles['register-form']}>
                    <input
                        minLength={5}
                        maxLength={40} 
                        type="email"
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder="Email Address"
                        required
                    />
                    <input
                        minLength={5} 
                        maxLength={40}
                        type="email" value={confirmEmail}
                        onChange={handleConfirmEmailChange} 
                        placeholder="Confirm Email Address"
                        required
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
                        required
                    />
                    <button onClick={handleSubmit}>Register</button>
                </div>
                <button className="register-form-login-button" onClick={() => navigate('/login')}>Login</button>
                {message && <div className="register-message-container">{message}</div>}
            </>
            ) : (
                <>
                    <div className={registerStyles['register-form']}>
                        <input
                            maxLength={6} 
                            type="string"
                            value={confirmationCodeInput} 
                            onChange={handleConfirmationCodeInputChange} 
                            placeholder="Confirmation Code"
                        />
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                    <button className="register-form-login-button" onClick={() => navigate('/login')}>Login</button>
                    {message && <div className="register-message-container">{message}</div>}
                </>
            )}
        </div>
    )
}