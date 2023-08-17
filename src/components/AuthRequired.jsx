import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem('loggedInStatus') === 'true';

    if (!isLoggedIn) {
        console.log(localStorage.getItem('loggedInStatus'));
        console.log("Logged out")
        return <Navigate to="/login" />
    } else {
        console.log("Logged in");
        console.log(localStorage.getItem('loggedInStatus'));
    }

    return <Outlet />
}