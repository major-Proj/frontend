import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [timesheets, setTimesheets] = useState(["123"]);
    const [feedbacks, setFeedbacks] = useState(["123"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dashboard', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    }
                });
                const data = await response.json();
                setTimesheets(data.payload.timesheet);
                setFeedbacks(data.payload.feedbacks);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-8 bg-gradient-to-br from-purple-500 to-blue-500 h-screen">
            <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-white">Timesheets</h2>
                    {timesheets.map((timesheet, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 mb-4">
                            <p className="text-white text-xl mb-2">{timesheet}</p>
                            <p className="text-green-300">Submitted</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-white">Feedbacks</h2>
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 mb-4">
                            <p className="text-white text-xl mb-2">{feedback}</p>
                            <p className="text-green-300">Submitted</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
