import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ResumeModal from '../../components/ResumeModal';
import useApplyJob from '../../hooks/useApplyJob';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { applyJob, showModal, setShowModal, handleUpload } = useApplyJob();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = user?.token;
        if (!token) {
          throw new Error('No token found');
        }
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/applicants/saved-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSavedJobs(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user]);

  const handleUnsaveJob = async (jobId) => {
    console.log("job unsaved", jobId)
  };

  return (
    <div className="space-y-6">
      <ResumeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onUpload={handleUpload}
      />
      <h2 className="text-2xl font-bold">Saved Jobs</h2>

      <div className="space-y-4">
        {loading && <p>Loading saved jobs...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && savedJobs.length === 0 && <p>No saved jobs found.</p>}
        {!loading &&
          !error &&
          savedJobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="mt-2 space-x-2">
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm">
                      {job.location}
                    </span>
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm">
                      {job.type}
                    </span>
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm">
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => applyJob(job._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleUnsaveJob(job._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Unsave Job
                  </button>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{job.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SavedJobs;