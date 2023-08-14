import React, { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/check-auth');
                const data = await response.json();
                setIsLoggedIn(data.loggedIn);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        checkAuthStatus();
    }, []);

    console.log(isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to="/login" />
    }
    
    return <Outlet />
}