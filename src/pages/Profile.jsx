import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileStyles from '../assets/styles/profile.module.css'

export default function Profile() {
    const { username } = useParams();
    const [profileData, setProfileData] = useState(null);

    const navigate = useNavigate();

    const handleResetUser = async () => {
        console.log("Reset user data");
        axios.post('/reset-user', {username})
    }

    const handleDeleteUser = async () => {
        console.log("Delete user data");
        axios.post('/delete-user', {username})
            .then(() => {
                console.log("User deleted");
                navigate('/login');
            })
            .catch(error => {
                console.error("Error deleting user : ", error)
            });
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/get-profile-data/${username}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching user data : ', error);
            }
        };

        fetchProfileData();
    }, [username]);

    useEffect(() => {
        console.log("profileData : ", profileData);
    }, [profileData]);

    return (   
        <div className={profileStyles['profile-container']}>
            {profileData ? (
                <>
                    <h1 className={profileStyles['profile-title']}>{username}</h1>
                    <div className={profileStyles['profile-buttons']}>
                        <button onClick={handleResetUser}>Reset User Data</button>
                        <button onClick={handleDeleteUser}>Delete User</button>
                    </div>
                    {profileData.unitsCompleted.map((unit, index) => (
                        <table className={profileStyles['profile-table']}>
                            <thead>
                                <th colSpan="2">Unit {unit.unitId}</th>
                            </thead>
                            <tbody>
                                {unit.answeredQuestions.map((question, questionIndex) => (
                                    <tr>
                                        <td>Question {questionIndex + 1}</td>
                                        <td>{question.correctlyAnswered ? 'Correct' : 'Incorrect'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
}