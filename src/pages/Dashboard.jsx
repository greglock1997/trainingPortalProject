import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="unit-section">
                <Link className="unit-link" to="/unit/1">1</Link>
                <Link className="unit-link" to="/unit/2">2</Link>
                <Link className="unit-link" to="/unit/3">3</Link>
            </div>
            <div className="unit-section">
                <Link className="unit-link" to="/unit/4">4</Link>
                <Link className="unit-link" to="/unit/5">5</Link>
                <Link className="unit-link" to="/unit/6">6</Link>
            </div>
        </div>
    )
}