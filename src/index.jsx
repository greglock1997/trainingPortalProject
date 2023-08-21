import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
 
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Unit from './pages/Unit.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import axios from 'axios';
import './index.css'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Update the user's logged in status when loading the application
    useEffect(() => {
        async function fetchLoginStatus() {
          try {
            const response = await axios.get('/check-auth');
            setIsLoggedIn(response.data.isLoggedIn)
          } catch (error) {
            console.error('Error fetching session status', error);
          }
        }
        fetchLoginStatus();
    });

    const logout = async () => {
        try {
            await axios.post('/logout');
            setIsLoggedIn(false);
        } catch(error) {
            console.error('Error during logout:', error);
        }    
    }

    return (
        <BrowserRouter>
            <div className="container">
                {isLoggedIn && (
                    <header>
                        {!isLoggedIn ? <Link to="/login">Login</Link> : ''}
                        {!isLoggedIn ? <Link to="/register">Register</Link> : ''}
                        {isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : ''}
                        {isLoggedIn ? <Link to="/login" onClick={logout}>Logout</Link> : ''}
                    </header>
                )}
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route element={<AuthRequired isLoggedIn={isLoggedIn} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/unit/:unitNumber" element={<Unit />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);