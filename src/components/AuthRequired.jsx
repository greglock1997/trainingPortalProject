import React, { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import axios from "axios";

export default function AuthRequired() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/check-auth")
            .then(response => {
                setIsLoggedIn(response.data.isLoggedIn);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}