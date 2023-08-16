import React, { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired({ isLoggedIn }) {
    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }
    
    return <Outlet />
}