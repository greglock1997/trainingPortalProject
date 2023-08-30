import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
 
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Unit from './pages/Unit.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import AdminRequired from './components/AdminRequired.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Admin from './pages/Admin.jsx'
import axios from 'axios';
import './index.css'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [username, setUsername] = useState('');
 
    // Fetch username
    useEffect(() => {
        async function fetchUsername() {
          try {
            const response = await axios.get('/check-username');
            setUsername(response.data.username);
          } catch (error) {
            console.error('Error fetching session status', error);
          }
        }
        fetchUsername();
    });

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

    // Update the user's admin status when loading the application
    useEffect(() => {
        async function fetchAdminStatus() {
            try {
                const response = await axios.get('/check-admin');
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error fetching admin status:', error);
            }
        }
        fetchAdminStatus();
    })

    // Logout function
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
                            <div className="header-nav">  
                                <Link to="/dashboard">Dashboard</Link>
                                {isAdmin && <Link to="/admin">Admin</Link>}
                                <Link to="/login" onClick={logout}>Logout</Link>
                            </div>
                            <Link to="#">{username}</Link>
                        </header>
                    )}
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/logout" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route element={<AuthRequired isLoggedIn={isLoggedIn} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/unit/:unitNumber" element={<Unit />} />
                        <Route element={<AdminRequired isLoggedIn={isLoggedIn} />}>
                            <Route path="/admin" element={<Admin />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);