import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Unit from './pages/Unit.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import './index.css'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchLoginStatus() {
          try {
            const response = await fetch('/checkIsLoggedIn');
            const data = await response.json();
            setIsLoggedIn(data.isLoggedIn);
          } catch (error) {
            console.error('Error fetching session status', error);
          }
        }
        fetchLoginStatus();
    }, [isLoggedIn]);

    const logout = async () => {
        localStorage.setItem('loggedInStatus', 'false');
        setIsLoggedIn(false);
    }

    return (
        <BrowserRouter>
            <div className="container">
                <header>
                    {!isLoggedIn ? <Link to="/login">Login</Link> : ''}
                    {!isLoggedIn ? <Link to="/register">Register</Link> : ''}
                    {isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : ''}
                    {!isLoggedIn ? <Link to="/logout" onClick={logout}>Logout</Link> : ''}
                </header>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
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