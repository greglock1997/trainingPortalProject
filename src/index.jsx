import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <div className="container">
            <header>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/protected">Protected</Link>
            </header>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<AuthRequired />}>
                    <Route path="/protected" element={<h1>Secret Page</h1>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
)