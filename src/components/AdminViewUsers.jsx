import React, { useState, useEffect } from 'react';
import TopNavbar from './Navbar';

const GetUsersForTimeline = () => {
    const [users, setUsers] = useState([]);
    const role = sessionStorage.getItem('role')

    useEffect(() => {
        const getUsersProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getUsersProjects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
                    }
                });

                const responseData = await response.json();
            
                if (response.ok) {
                    setUsers(responseData.users);
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };
        getUsersProjects();
        
    }, []);

    console.log(users);
    return (
        <div>
            <TopNavbar/>
        {role === 'admin' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-4 flex justify-between">
                  <a href={`/UserTimeFeedback?email=${encodeURIComponent(user.email)}`}> <button className="bg-blue-500 text-white px-4 py-2 rounded-md">view timesheet/feedback</button></a>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <p>not allowed</p>
        )}
        </div>
    );
};

export default GetUsersForTimeline;

