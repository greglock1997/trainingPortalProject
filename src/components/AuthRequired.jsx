import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired({ isLoggedIn }) {
    if (!localStorage.getItem('loggedInStatus')) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}