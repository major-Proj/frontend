import React, { useState, useSyncExternalStore } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function FeedbackDashModule() {
    const [accessToken, setToken] = useState(sessionStorage.getItem('accessToken')); // Assume user is not an admin by default  
    const [feedbackFilled,setFeedbackFIlled] = useState({})
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

                } catch (error) {
                    console.error('Error fetching projects:', error.message);
                }
            };

            getUsersFeedbacks();
        }
    }, []);

    console.log(feedbackFilled);

    return (
        <div>
          {Object.values(feedbackFilled).map((entry, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">PID: {entry.PID}</h5>
                <p className="card-text">
                  Start Period: {Date(entry.start_period)}<br />
                  End Period: {Date(entry.end_period)}
                </p>
                <a href={`/feedback/newfeedback?pid=${encodeURIComponent(entry.PID)}&start=${encodeURIComponent(entry.start_period)}&end=${encodeURIComponent(entry.end_period)}`} className="btn btn-primary">fill Feedback</a>
              </div>
            </div>
          ))}
        </div>
      );
}

export default FeedbackDashModule;
