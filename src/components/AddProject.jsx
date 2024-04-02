import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function AddProject() {
  const [formData, setFormData] = useState({
    name: '',
    PID: '',
    client_name: '',
    start: '',
    end: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/createProject', {
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
      if (res.message!="Project Added") {
        alert('Failed to add project');
      }
      else {
        alert('project added succussfully')
      }
 
      setFormData({
        name: '',
        client_name: '',
        start: '',
        end: ''
      });
      
    } catch (error) {
      console.error('Error adding project:', error.message);
      setErrorMessage(error.message);
    }
  };
 
  return (
    <div className="container mx-auto px-4 py-10 w-full">
  <h2 className="text-2xl font-bold mb-4">Add Project</h2>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  <form onSubmit={handleSubmit} className='w-full'>
    <div className="mb-4">
      <label htmlFor="name" className="block">Project Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="form-input w-full" required />
    </div>
    <div className="mb-4">
      <label htmlFor="client_name" className="block">Client Name:</label>
      <input type="text" id="client_name" name="client_name" value={formData.client_name} onChange={handleInputChange} className="form-input w-full" required />
    </div>
    <div className="mb-4">
      <label htmlFor="start" className="block">Start Date:</label>
      <input type="date" id="start" name="start" value={formData.start} onChange={handleInputChange} className="form-input w-full" required />
    </div>
    <div className="mb-4">
      <label htmlFor="end" className="block">End Date:</label>
      <input type="date" id="end" name="end" value={formData.end} onChange={handleInputChange} className="form-input w-full" required />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Project</button>
  </form>
</div>

  );
}
 
export default AddProject;
