import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import BackButton from '../../components/BackButton';

function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = user?.token;
        const recruiterId = user?.id;

        if (!token || !recruiterId) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recruiters/recruiter/${recruiterId}`, {
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
  }, [user]);

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(applications.map(app => {
      if (app._id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex mb-4">
          <BackButton />
          <h1 className="text-2xl font-bold ml-2">Job Applications</h1>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map(application => (
              <tr key={application._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application.applicant.name}</div>
                  {/* <div className="text-sm text-gray-500">{application.experience} experience</div> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.job.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(application.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${application.status === 'shortlisted' ? 'bg-green-100 text-green-800' : ''}
                    ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="space-x-2">
                    <button
                      onClick={() => handleStatusChange(application._id, 'shortlisted')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusChange(application._id, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                    <a
                      href={application.resume}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllApplications;