import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiFileText, FiUser, FiBookmark } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function RecruiterDashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const fullName = user.name;
  const firstName = fullName.split(' ')[0];

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
    <div className="space-y-8 max-w-screen-lg mx-auto p-4">
      <div className="text-center">
        <h2 className="text-3xl font-medium text-gray-800">Welcome, {firstName}!</h2>
        <p className="text-lg text-gray-500 mt-2">Post jobs, review applications, and manage your profile.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform hover:shadow-lg transition-all duration-500">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Active Job Postings</h3>
          <div className="space-y-4">
            {jobPostings.map(job => (
              <div key={job.id} className="border-b pb-3">
                <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.applicants} Applicants</p>
                <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold bg-green-200 text-green-800 rounded-full">
                  {job.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/recruiter/jobs" className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium">
            View all job postings
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform hover:shadow-lg transition-all duration-500">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Applications</h3>
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="border-b pb-3">
                <h4 className="text-lg font-medium text-gray-700">{app.name}</h4>
                <p className="text-sm text-gray-600">{app.position}</p>
                <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold bg-yellow-200 text-yellow-800 rounded-full">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/recruiter/applications" className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium">
            View all applications
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6 hover:scale-105 transform hover:shadow-lg transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            to="/recruiter/post-job"
            className="p-5 flex flex-col items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiBriefcase size={24} className="text-blue-600 mb-2" />
            <span className="text-xs font-medium text-blue-700">Post Job</span>
          </Link>
          <Link
            to="/recruiter/applications"
            className="p-5 flex flex-col items-center justify-center bg-green-100 rounded-xl hover:bg-green-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiFileText size={24} className="text-green-600 mb-2" />
            <span className="text-xs font-medium text-green-700">Review Apps</span>
          </Link>
          <Link
            to="/profile"
            className="p-5 flex flex-col items-center justify-center bg-purple-100 rounded-xl hover:bg-purple-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiUser size={24} className="text-purple-600 mb-2" />
            <span className="text-xs font-medium text-purple-700">Profile</span>
          </Link>
          <Link
            to="/recruiter/analytics"
            className="p-5 flex flex-col items-center justify-center bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiBookmark size={24} className="text-yellow-600 mb-2" />
            <span className="text-xs font-medium text-yellow-700">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
