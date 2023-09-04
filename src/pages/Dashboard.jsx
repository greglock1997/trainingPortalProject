import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
import axios from 'axios';

import dashboardStyles from '../assets/styles/dashboard.module.css'

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

    useEffect(() => {
        console.log("CompletedUnits : ", completedUnits);
    }, completedUnits);

    const isCompleted = (unitNumber)  => {
        if (unitNumber === 1 || completedUnits.includes(unitNumber - 1)) {
            if (completedUnits.includes(unitNumber)) {
                return dashboardStyles['unit-link-completed'];
            } else {
                return dashboardStyles['unit-link'];
            }
        } else {
            return dashboardStyles['unit-link-locked'];
        }
    };

    return (
        <div className={dashboardStyles['dashboard-container']}>
            <div className={dashboardStyles['progress-bar-container']}>
                <div className={dashboardStyles['progress-bar']} style={{width: `${window.innerWidth * (completedUnits.length / 9 )}px`}}></div>
            </div>
            <div className={dashboardStyles['unit-section']}>
                <Link className={isCompleted(1)} to="/unit/1">Intro</Link>
                <Link className={isCompleted(2)} to="/unit/2">The UK Energy Industry & Switching</Link>
                <Link className={isCompleted(3)} to="/unit/3">Introduction to Energy Bills</Link>
            </div>
            <div className={dashboardStyles['unit-section']}>
                <Link className={isCompleted(4)} to="/unit/4">Energy Price Gaurantee</Link>
                <Link className={isCompleted(5)} to="/unit/5">Metering</Link>
                <Link className={isCompleted(6)} to="/unit/6">Customer Vulnerabilities</Link>
            </div>
            <div className={dashboardStyles['unit-section']}>
                <Link className={isCompleted(7)} to="/unit/7">Ability to Pay, Debt and Payment Plans</Link>
                <Link className={isCompleted(8)} to="/unit/8">Fuel Direct</Link>
                <Link className={isCompleted(9)} to="/unit/9">Complaints</Link>
            </div>
        </div>
    )
}