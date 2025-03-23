import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiFileText, FiUser, FiBookmark } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function ApplicantDashboard() {
  const [applications, setApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const fullName = user.name;
  const firstName = fullName.split(' ')[0];

  useEffect(() => {
    setApplications([
      { id: 1, company: 'Tech Corp', position: 'Frontend Developer', status: 'Pending' },
      { id: 2, company: 'Design Co', position: 'UI Designer', status: 'Reviewed' }
    ]);

    setRecentJobs([
      { id: 1, title: 'Senior Developer', company: 'Innovation Inc', location: 'Remote' },
      { id: 2, title: 'Product Manager', company: 'StartUp Ltd', location: 'New York' }
    ]);
  }, []);

  return (
    <div className="space-y-8 max-w-screen-lg mx-auto p-4">
      <div className="text-center">
        <h2 className="text-3xl font-medium text-gray-800">Welcome, {firstName}!</h2>
        <p className="text-lg text-gray-500 mt-2">Manage your applications and explore job opportunities!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Applications</h3>
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="border-b pb-3">
                <h4 className="text-lg font-medium text-gray-700">{app.position}</h4>
                <p className="text-sm text-gray-600">{app.company}</p>
                <span className={`inline-block px-2 py-1 mt-2 text-xs font-semibold rounded-full ${app.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/applicant/applications" className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium">
            View all applications
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Job Postings</h3>
          <div className="space-y-4">
            {recentJobs.map(job => (
              <div key={job.id} className="border-b pb-3">
                <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
            ))}
          </div>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium">
            Browse all jobs
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            to="/jobs"
            className="p-5 flex flex-col items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiBriefcase size={24} className="text-blue-600 mb-2" />
            <span className="text-xs font-medium text-blue-700">Search Jobs</span>
          </Link>
          <Link
            to="/applicant/resume-builder"
            className="p-5 flex flex-col items-center justify-center bg-green-100 rounded-xl hover:bg-green-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiFileText size={24} className="text-green-600 mb-2" />
            <span className="text-xs font-medium text-green-700">Resume Builder</span>
          </Link>
          <Link
            to="/profile"
            className="p-5 flex flex-col items-center justify-center bg-purple-100 rounded-xl hover:bg-purple-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiUser size={24} className="text-purple-600 mb-2" />
            <span className="text-xs font-medium text-purple-700">Update Profile</span>
          </Link>
          <Link
            to="/applicant/saved-jobs"
            className="p-5 flex flex-col items-center justify-center bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiBookmark size={24} className="text-yellow-600 mb-2" />
            <span className="text-xs font-medium text-yellow-700">Saved Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDashboard;
