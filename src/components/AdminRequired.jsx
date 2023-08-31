import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function AdminRequired() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/check-admin")
            .then(response => {
                setIsAdmin(response.data.isAdmin);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (!isAdmin) {
        Cookies.set('accessMessage', 'Please login as admin');
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
}
