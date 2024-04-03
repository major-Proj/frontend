import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNavbar from './Navbar';
let Questions = require('../data/feedbackQuestions.json')

function StarRating({ id, value, onChange }) {
    const [rating, setRating] = useState(value);

    const handleClick = (newValue) => {
        setRating(newValue);
        onChange({ target: { name: id, value: newValue } });
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((index) => (
                <span
                    key={index}
                    className={index <= rating ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
                    onClick={() => handleClick(index)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

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
            if (res.message !== "Feedback data saved") {
                alert('Failed to save data');
            }
            else {
                alert('Feedback given successfully')
            }

            navigate('/feedback');

        } catch (error) {
            console.error('Error submitting feedback:', error.message)
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
                    start_period: decodedStart,
                    end_period: decodedEnd,
                    feedback_given: true
                }),
            });

        } catch (error) {
            alert('Error updating feedback history:', error.message)
            console.error('Error fetching timesheet data:', error);
        }
    };

    return (
        <div>
            <TopNavbar />
            <div className="grid grid-cols-5 mx-auto p-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-md">
                <div className='4 col-span-1'></div>
                <div className='col-span-3 bg-[rgba(255,255,255,0.1)] p-4 rounded-lg backdrop-blur-xl shadow-xl'>
                    <h2 className="text-3xl font-bold mb-6 text-white">Feedback Form</h2>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(Questions.common).map((key) => (
                            <div key={key} className="mb-4">
                                <label htmlFor={key} className="block font-bold text-white">{Questions.common[key]}</label>
                                <StarRating id={key} name={key} value={formData[key]} onChange={handleInputChange} />
                            </div>
                        ))}
                        {role && Object.keys(Questions[role]).map((key) => (
                            <div key={key} className="mb-4">
                                <label htmlFor={key} className="block font-bold text-white">{Questions[role][key]}</label>
                                <StarRating id={key} name={key} value={formData[key]} onChange={handleInputChange} />
                            </div>
                        ))}
                        <div className="mb-4">
                            <label htmlFor="comments" className="block font-bold text-white">Comments:</label>
                            <textarea id="comments" name="comments" value={formData.comments} onChange={handleInputChange} className="form-textarea" required />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FeedbackModule;