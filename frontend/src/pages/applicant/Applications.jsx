import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function YourApplications() {
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = user?.token;
        const userId = user?.id;
        if (!token) return;
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/applicants/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
      });
        setApplications(response.data.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Your Applications</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app._id} className="border-b pb-4">
              <h4 className="font-medium">{app.job.title}</h4>
              <p className="text-gray-600">{app.job.company}</p>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                app.status === 'Reviewed' ? 'bg-green-100 text-green-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourApplications;