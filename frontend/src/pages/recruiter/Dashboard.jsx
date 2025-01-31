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
    <div className="space-y-12 max-w-screen-xl mx-auto p-6">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">Welcome, {firstName}!</h2>
        <p className="text-xl text-gray-500 mt-2">Post job openings, review applications, and manage your company profile!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-xl transition-all hover:scale-105 transform hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Active Job Postings</h3>
          <div className="space-y-6">
            {jobPostings.map(job => (
              <div key={job.id} className="border-b pb-4">
                <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                <p className="text-gray-600">{job.applicants} Applicants</p>
                <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold bg-green-200 text-green-800 rounded-full">
                  {job.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/recruiter/jobs" className="text-blue-600 hover:text-blue-800 mt-6 block font-medium">
            View all job postings
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl transition-all hover:scale-105 transform hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Recent Applications</h3>
          <div className="space-y-6">
            {applications.map(app => (
              <div key={app.id} className="border-b pb-4">
                <h4 className="text-lg font-medium text-gray-700">{app.name}</h4>
                <p className="text-gray-600">{app.position}</p>
                <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold bg-yellow-200 text-yellow-800 rounded-full">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/recruiter/applications" className="text-blue-600 hover:text-blue-800 mt-6 block font-medium">
            View all applications
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl mt-8 transition-all hover:scale-105 transform hover:shadow-2xl">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Link
            to="/recruiter/post-job"
            className="p-6 flex flex-col items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiBriefcase size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-700">Post New Job</span>
          </Link>
          <Link
            to="/recruiter/applications"
            className="p-6 flex flex-col items-center justify-center bg-green-100 rounded-xl hover:bg-green-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiFileText size={28} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-700">Review Applications</span>
          </Link>
          <Link
            to="/profile"
            className="p-6 flex flex-col items-center justify-center bg-purple-100 rounded-xl hover:bg-purple-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiUser size={28} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-700">Company Profile</span>
          </Link>
          <Link
            to="/recruiter/analytics"
            className="p-6 flex flex-col items-center justify-center bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiBookmark size={28} className="text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-yellow-700">Job Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
