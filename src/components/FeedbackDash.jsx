import React, { useState, useSyncExternalStore } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from './Navbar';


function FeedbackDashModule() {
    const [accessToken, setToken] = useState(sessionStorage.getItem('accessToken')); // Assume user is not an admin by default  
    const [feedbackFilled, setFeedbackFIlled] = useState({})
    const [projects, setProjets] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            const getUsersFeedbacks = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/Unfilledfeedbacks', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    const responseData = await response.json();

                    setFeedbackFIlled(responseData['payload']);
                    setProjets(responseData['projects'])

                } catch (error) {
                    console.error('Error fetching projects:', error.message);
                }
            };

            getUsersFeedbacks();
        }
    }, []);


    return (
        <div>
        <TopNavbar/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 row-auto gap-4 w-full h-48">
            <h2 className="text-5xl flex justify-center font-bold col-span-full h-min text-white">Pending feedbacks</h2>
            {Object.values(feedbackFilled).map((entry, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg ">
                    <div className="p-4">
                        <h5 className="text-xl font-semibold mb-2">Project: {projects.find(project => project.PID === entry.PID)['name']}</h5>
                        <p className="text-sm text-gray-600 mb-2">
                            Start Period: {new Date(entry.start_period).toDateString()}<br />
                            End Period: {new Date(entry.end_period).toDateString()}
                        </p>
                        <a href={`/feedback/newfeedback?pid=${encodeURIComponent(entry.PID)}&start=${encodeURIComponent(entry.start_period)}&end=${encodeURIComponent(entry.end_period)}`} className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Fill Feedback</a>
                    </div>
                </div>
            ))}
        </div>
        </div>


    );
}

export default FeedbackDashModule;
