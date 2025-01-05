import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecruiterDashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setJobPostings([
      { id: 1, title: 'Senior Developer', applicants: 12, status: 'Active' },
      { id: 2, title: 'UI Designer', applicants: 8, status: 'Active' }
    ]);

    setApplications([
      { id: 1, name: 'John Doe', position: 'Senior Developer', status: 'Under Review' },
      { id: 2, name: 'Jane Smith', position: 'UI Designer', status: 'Shortlisted' }
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Recruiter Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Active Job Postings</h3>
          <div className="space-y-4">
            {jobPostings.map(job => (
              <div key={job.id} className="border-b pb-4">
                <h4 className="font-medium">{job.title}</h4>
                <p className="text-gray-600">{job.applicants} Applicants</p>
                <span className="inline-block px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                  {job.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/recruiter/jobs" className="text-blue-600 hover:underline block mt-4">
            View your job postings
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="border-b pb-4">
                <h4 className="font-medium">{app.name}</h4>
                <p className="text-gray-600">{app.position}</p>
                <span className="inline-block px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/recruiter/applications" className="text-blue-600 hover:underline block mt-4">
            View all applications
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/recruiter/post-job"
            className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            Post New Job
          </Link>
          <Link
            to="/recruiter/applications"
            className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100"
          >
            Review Applications
          </Link>
          <Link
            to="/profile"
            className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100"
          >
            Company Profile
          </Link>
          <Link
            to="/recruiter/analytics"
            className="p-4 text-center bg-yellow-50 rounded-lg hover:bg-yellow-100"
          >
            Job Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;