import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="unit-section">
                <Link className="unit-link" to="/unit/1">Intro</Link>
                <Link className="unit-link" to="/unit/2">The UK Energy Industry & Switching</Link>
                <Link className="unit-link" to="/unit/3">Introduction to Energy Bills</Link>
            </div>
            <div className="unit-section">
                <Link className="unit-link" to="/unit/4">Energy Price Gaurantee</Link>
                <Link className="unit-link" to="/unit/5">Metering</Link>
                <Link className="unit-link" to="/unit/6">Customer Vulnerabilities</Link>
            </div>
            <div className="unit-section">
                <Link className="unit-link" to="/unit/7">Ability to Pay, Debt and Payment Plans</Link>
                <Link className="unit-link" to="/unit/8">Fuel Direct</Link>
                <Link className="unit-link" to="/unit/9">Complaints</Link>
            </div>
        </div>
    )
}