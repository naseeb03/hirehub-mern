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
    <div className="space-y-12 max-w-screen-xl mx-auto p-6">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">Welcome, {firstName}!</h2>
        <p className="text-xl text-gray-500 mt-2">Manage your applications and explore job opportunities!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-xl transition-all hover:scale-105 transform hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Applications</h3>
          <div className="space-y-6">
            {applications.map(app => (
              <div key={app.id} className="border-b pb-4">
                <h4 className="text-lg font-medium text-gray-700">{app.position}</h4>
                <p className="text-gray-600">{app.company}</p>
                <span className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${app.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/applicant/applications" className="text-blue-600 hover:text-blue-800 mt-6 block font-medium">
            View all applications
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl transition-all hover:scale-105 transform hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Recent Job Postings</h3>
          <div className="space-y-6">
            {recentJobs.map(job => (
              <div key={job.id} className="border-b pb-4">
                <h4 className="text-lg font-medium text-gray-700">{job.title}</h4>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
            ))}
          </div>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-800 mt-6 block font-medium">
            Browse all jobs
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl mt-8 transition-all hover:scale-105 transform hover:shadow-2xl">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Link
            to="/jobs"
            className="p-6 flex flex-col items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiBriefcase size={28} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-700">Search Jobs</span>
          </Link>
          <Link
            to="/applicant/resume-builder"
            className="p-6 flex flex-col items-center justify-center bg-green-100 rounded-xl hover:bg-green-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiFileText size={28} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-700">Resume Builder</span>
          </Link>
          <Link
            to="/profile"
            className="p-6 flex flex-col items-center justify-center bg-purple-100 rounded-xl hover:bg-purple-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiUser size={28} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-700">Update Profile</span>
          </Link>
          <Link
            to="/applicant/saved-jobs"
            className="p-6 flex flex-col items-center justify-center bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-shadow shadow-md hover:shadow-lg"
          >
            <FiBookmark size={28} className="text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-yellow-700">Saved Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDashboard;
