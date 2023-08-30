import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import resetPasswordStyles from '../assets/styles/resetPassword.module.css';

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
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmationCodeInput, setConfirmationCodeInput] = useState('');
    const [currentPage, setCurrentPage] = useState('form')
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // Reset login status
    useEffect(() => {
        axios.post('/logout');
    }, []);

    // Handle username and password changes in input form
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleConfirmEmailChange = (event) => {
        setConfirmEmail(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value); 
    }

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    }

    const handleConfirmationCodeInputChange = (event) => {
        setConfirmationCodeInput(event.target.value);
    }

    const handleSubmit = async (event) => {
        // Form page
        if (currentPage === 'form') {
            // Prevents page refresh
            event.preventDefault();
            // Check that entered data is valid
            if ((email === confirmEmail) && (newPassword === confirmNewPassword)) {
                // Send request to check that user exists in database
                const response = axios.post('/check-user', { username: email });
                const data = (await response).data;
                // If user exists
                if (data.status === 409) {
                    setCurrentPage('confirmation');
                    setSuccessMessage('Confirmation code sent');
                    setErrorMessage('');
                    axios.post('/reset-password-email', { email, confirmationCode });
                // If user doesn't exist
                } else if (data.status === 200) {
                    setErrorMessage('User not registered');
                }
            // If details don't match, send error message
            } else if (email === confirmEmail) {
                setErrorMessage('Passwords do not match')
            } else if (newPassword === confirmNewPassword) {
                setErrorMessage('Emails do not match')
            } else {
                setErrorMessage('Emails and passwords do not match')
            }
        // Confirmation code page
        } else if (currentPage === 'confirmation') {
            if (confirmationCode == confirmationCodeInput) {
                try {
                    setSuccessMessage('Password changed');
                    await axios.post('/reset-password', {email, newPassword})
                } catch (error) {
                    console.error(error);
                }
            } else if (confirmationCodeInput === ''){
                setErrorMessage('Please enter confirmation code');
            } else {
                setErrorMessage('Incorrect code');
            }
        }
    };

    const resetPage = () => {
        setCurrentPage('form');
        setErrorMessage('');
        setSuccessMessage('');
        setEmail('');
        setConfirmEmail('');
        setNewPassword('');
        setConfirmNewPassword('');
        setConfirmationCodeInput('');
    }

    return (
        <div className={resetPasswordStyles['reset-password-container']}>
            <img src="../src/assets/images/logo.png" alt="" />
            {currentPage === 'form' ? (
            <>
                <form className={resetPasswordStyles['reset-password-form']} onSubmit={handleSubmit}>
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
                        value={newPassword} 
                        onChange={handleNewPasswordChange} 
                        placeholder="New Password"
                        required
                    />
                    <input
                        minLength={5}
                        maxLength={20} 
                        type="password" 
                        value={confirmNewPassword} 
                        onChange={handleConfirmNewPasswordChange} 
                        placeholder="Confirm New Password"
                        required
                    />
                    <button>Register</button>
                </form>
                <button className={resetPasswordStyles['reset-password-login-button']} onClick={() => navigate('/login')}>Login</button>
                {errorMessage && <div className={resetPasswordStyles['reset-password-error-message']}>{errorMessage}</div>}
                {successMessage && <div className={resetPasswordStyles['reset-password-success-message']}>{successMessage}</div>}
            </>
            ) : (
                <>
                    <div className={resetPasswordStyles['reset-password-form']}>
                        <input
                            maxLength={6} 
                            type="string"
                            value={confirmationCodeInput}
                            onChange={handleConfirmationCodeInputChange} 
                            placeholder="Confirmation Code"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <button className={resetPasswordStyles['reset-password-login-button']} onClick={() => resetPage()}>Reset Page</button>
                    <button className={resetPasswordStyles['reset-password-login-button']} onClick={() => navigate('/login')}>Login</button>
                    {errorMessage && <div className={resetPasswordStyles['reset-password-error-message']}>{errorMessage}</div>}
                    {successMessage && <div className={resetPasswordStyles['reset-password-success-message']}>{successMessage}</div>}
                </>
            )}
        </div>
    )
}