import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios' 

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        axios.post('/logout');
    }

    return (
        <header>
            {!isLoggedIn ? <Link to="/login">Login</Link> : ''}
            {!isLoggedIn ? <Link to="/register">Register</Link> : ''}
            {isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : ''}
            {isLoggedIn ?<Link to="/login" onClick={logout}>Logout</Link> : ''}
        </header>
    )
}