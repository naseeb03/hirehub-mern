import React, { useState, useEffect } from 'react';

function YourApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications([
      { id: 1, company: 'Tech Corp', position: 'Frontend Developer', status: 'Pending' },
      { id: 2, company: 'Design Co', position: 'UI Designer', status: 'Reviewed' },
      { id: 3, company: 'Health Inc', position: 'Backend Developer', status: 'Rejected' }
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Your Applications</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="border-b pb-4">
              <h4 className="font-medium">{app.position}</h4>
              <p className="text-gray-600">{app.company}</p>
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