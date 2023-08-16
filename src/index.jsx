import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom' 
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Unit from './pages/Unit.jsx'
import Header from './components/Header.jsx'
import Message from './components/Message.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import Unit4 from './pages/units/Unit4.jsx'
import './index.css'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
    }

    return (
        <BrowserRouter>
            <div className="container">
                <header>
                    {!isLoggedIn ? <Link to="/login">Login</Link> : ''}
                    {isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : ''}
                    {isLoggedIn ? <Link to="/login" onClick={logout}>Logout</Link> : ''}
                </header>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unit4" element={<Unit4/>} />
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