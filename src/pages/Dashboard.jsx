import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
import axios from 'axios';

export default function Dashboard() {
    const [completedUnits, setCompletedUnits] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/get-data');
                console.log(response.data);
                setCompletedUnits(response.data);
            } catch (error) {
                console.error('Error fetching completed units: ', error);
            }
        }

        fetchData();
    }, []);

    const isCompleted = (unitNo)  => {
        if (completedUnits.includes(unitNo)) {
            return 'hide';
        };
    };

    return (
        <div className="dashboard-container">
            <div className="unit-section">
                <Link className="unit-link" to="/unit/1">Intro</Link>
                <Link className="unit-link" to="/unit/2">The UK Energy Industry & Switching</Link>
                <Link className="unit-link" to="/unit/3">Introduction to Energy Bills</Link>
            </div>
            <div className="unit-section">
                <Link className={isCompleted(4)} to="/unit/4">Energy Price Gaurantee</Link>
                <Link className={isCompleted(5)} to="/unit/5">Metering</Link>
                <Link className={isCompleted(6)} to="/unit/6">Customer Vulnerabilities</Link>
            </div>
            <div className="unit-section">
                <Link className="unit-link" to="/unit/7">Ability to Pay, Debt and Payment Plans</Link>
                <Link className="unit-link" to="/unit/8">Fuel Direct</Link>
                <Link className="unit-link" to="/unit/9">Complaints</Link>
            </div>
        </div>
    )
}