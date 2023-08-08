import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <header>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </header>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
)