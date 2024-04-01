import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
let Questions = require('../data/feedbackQuestions.json')

function FeedbackModule() {
    const [accessToken, setToken] = useState(sessionStorage.getItem('accessToken'));
    const [role, setRole] = useState(sessionStorage.getItem('role')); // Assume user is not an admin by default
    const location = useLocation();

    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const PID = searchParams.get('pid');
    const start_period = searchParams.get('start');
    const end_period = searchParams.get('end');
    const decodedPID = decodeURIComponent(PID);
    const decodedStart = decodeURIComponent(start_period);
    const decodedEnd = decodeURIComponent(end_period);

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }

        console.log(decodedPID, decodedStart, decodedEnd)
    }, [location.search]);

    const [formData, setFormData] = useState({
        q1: 1,
        q2: 1,
        q3: 1,
        q4: 1,
        q5: 1,
        q6: 1,
        q7: 1,
        q8: 1,
        comments: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('http://localhost:5000/api/CreateFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    PID: PID,
                    start_period: start_period,
                    end_period: end_period,
                    feedback: formData
                })
            });

            const res = await response.json()
            if (res.message != "Feedback data saved") {
                alert('Failed to save data');
            }
            else {
                alert('feedback given succussfully')
            }

            navigate('/feedback');

        } catch (error) {
            console.error('Error allocating project:', error.message)
        }

        try {
            const response = await fetch('http://localhost:5000/api/FeedbackHistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    PID: PID,
                    start_period: start_period,
                    end_period: end_period,
                    feedback_given: true
                }),
            });

        } catch (error) {
            console.error('Error fetching timesheet data:', error);
        }

    };

    return (
        <div>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="q1">{Questions.common.q1}</label>
                    <input type="number" id="q1" name="q1" value={formData.q1} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q2">{Questions.common.q2}</label>
                    <input type="number" id="q2" name="q2" value={formData.q2} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q3">{Questions.common.q3}</label>
                    <input type="number" id="q3" name="q3" value={formData.q3} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q4">{Questions.common.q4}</label>
                    <input type="number" id="q4" name="q4" value={formData.q4} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q5">{Questions.common.q5}</label>
                    <input type="number" id="q5" name="q5" value={formData.q5} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q6">{Questions[role].q6}</label>
                    <input type="number" id="q6" name="q6" value={formData.q6} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q7">{Questions[role].q7}</label>
                    <input type="number" id="q7" name="q7" value={formData.q7} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="q8">{Questions[role].q8}</label>
                    <input type="number" id="q8" name="q8" value={formData.q8} onChange={handleInputChange} min="1" max="5" required />
                </div>
                <div>
                    <label htmlFor="comments">Comments:</label>
                    <textarea id="comments" name="comments" value={formData.comments} onChange={handleInputChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FeedbackModule;
