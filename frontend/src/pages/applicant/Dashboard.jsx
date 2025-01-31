import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiFileText, FiUser, FiBookmark } from 'react-icons/fi';

function ApplicantDashboard() {
  const [applications, setApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

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
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Your Applications</h3>
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="border-b pb-4">
                <h4 className="font-medium">{app.position}</h4>
                <p className="text-gray-600">{app.company}</p>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/applicant/applications" className="text-blue-600 hover:underline block mt-4">
            View all applications
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Job Postings</h3>
          <div className="space-y-4">
            {recentJobs.map(job => (
              <div key={job.id} className="border-b pb-4">
                <h4 className="font-medium">{job.title}</h4>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
            ))}
          </div>
          <Link to="/jobs" className="text-blue-600 hover:underline block mt-4">
            Browse all jobs
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/jobs"
            className="p-4 flex flex-col items-center justify-center bg-blue-100 rounded-xl hover:bg-blue-200 transition shadow-sm"
          >
            <FiBriefcase size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium">Search Jobs</span>
          </Link>
          <Link
            to="/applicant/resume-builder"
            className="p-4 flex flex-col items-center justify-center bg-green-100 rounded-xl hover:bg-green-200 transition shadow-sm"
          >
            <FiFileText size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium">Resume Builder</span>
          </Link>
          <Link
            to="/profile"
            className="p-4 flex flex-col items-center justify-center bg-purple-100 rounded-xl hover:bg-purple-200 transition shadow-sm"
          >
            <FiUser size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium">Update Profile</span>
          </Link>
          <Link
            to="/applicant/saved-jobs"
            className="p-4 flex flex-col items-center justify-center bg-yellow-100 rounded-xl hover:bg-yellow-200 transition shadow-sm"
          >
            <FiBookmark size={24} className="text-yellow-600 mb-2" />
            <span className="text-sm font-medium">Saved Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDashboard;