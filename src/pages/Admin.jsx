import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import adminStyles from '../assets/styles/admin.module.css'

export default function Admin() {
    const [traineeData, setTraineeData] = useState(null);

    const getData = async () => {
        const response = await axios.get('/get-trainee-data');
        const data = response.data.traineeData;
        console.log(data);
        setTraineeData(data);
        console.log(traineeData);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={adminStyles['admin-container']}>
            {traineeData ? (
            <table className={adminStyles['admin-table']}>
                <thead>
                    <tr>
                        <th className={adminStyles['admin-table-head']}>Name</th>
                        <th className={adminStyles['admin-table-head']}>Units Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {traineeData.map((user, index) => (
                        <tr key={index}>
                            <td><Link to={`/profile/${user.username}`}>{user.username}</Link></td>
                            <td>{user.unitsCompleted.length} / 9</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}