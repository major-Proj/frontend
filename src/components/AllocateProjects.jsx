import React, { useState, useEffect } from 'react';

const AllocateProjects = () => {
  const [data, setData] = useState({ users: [], projects: [] });
  const [formData, setFormData] = useState({
    PID: '',
    email: '',
    allocation_start: '',
    allocation_end: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

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
          setData(responseData);
        } else {
          throw new Error(responseData.message || 'Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error.message);
        setErrorMessage(error.message);
      }
    };

    getUsersProjects();
  }, []);

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
      const response = await fetch('http://localhost:5000/api/allocateProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          ...formData,
        })
      });
      
      const res = await response.json()
      if (res.message!="Project allocated") {
        alert('Failed to allocate project');
      }
      else {
        alert('project allocated succussfully')
      }
 
      setFormData({
        name: '',
        PID: '',
        client_name: '',
        start: '',
        end: ''
      });
      
    } catch (error) {
      console.error('Error allocating project:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold mb-4">Allocate Projects</h2>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="projectID" className="block">Project ID:</label>
      <select id="PID" name="PID" value={formData.projectID} onChange={handleInputChange} className="form-select" required>
        <option value="">Select Project ID</option>
        {data.projects.map(project => (
          <option key={project.PID} value={project.PID}>{project.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block">Name:</label>
      <select id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-select" required>
        <option value="">Select Email</option>
        {data.users.map(user => (
          <option key={user.email} value={user.email}>{user.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label htmlFor="allocationStart" className="block">Allocation Start:</label>
      <input type="date" id="allocation_start" name="allocation_start" value={formData.allocation_start} onChange={handleInputChange} className="form-input" required />
    </div>
    <div className="mb-4">
      <label htmlFor="allocationEnd" className="block">Allocation End:</label>
      <input type="date" id="allocation_end" name="allocation_end" value={formData.allocation_end} onChange={handleInputChange} className="form-input" required />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Allocate Project</button>
  </form>
</div>
  );
};

export default AllocateProjects;

