import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import profileStyles from '../assets/styles/profile.module.css'

export default function Profile() {
    const { username } = useParams();
    const [profileData, setProfileData] = useState(null);

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