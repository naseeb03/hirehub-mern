import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

function JobSearch() {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    jobType: 'all',
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/`);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = jobs.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(searchParams.keyword.toLowerCase());
      const matchesLocation =
        job.location.toLowerCase().includes(searchParams.location.toLowerCase());
      const matchesJobType =
        searchParams.jobType === 'all' || job.type === searchParams.jobType;

      return matchesKeyword && matchesLocation && matchesJobType;
    });

    setFilteredJobs(filtered);
  };

  const handleClearFilters = () => {
    setSearchParams({
      keyword: '',
      location: '',
      jobType: 'all'
    });
    setFilteredJobs(jobs);
  };

  const handleApply = (jobId) => {
    console.log('Applying to job:', jobId);
  };

  const handleSaveJob = async (jobId) => {
    try {
      const token = user?.token;
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/applicants/save-jobs`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || 'Job saved successfully!');
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Search Jobs</h2>

      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Keywords</label>
            <input
              type="text"
              value={searchParams.keyword}
              onChange={(e) =>
                setSearchParams({ ...searchParams, keyword: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              placeholder="Job title, skills, or company"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              placeholder="City, state, or remote"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Job Type</label>
            <select
              value={searchParams.jobType}
              onChange={(e) =>
                setSearchParams({ ...searchParams, jobType: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Search Jobs
        </button>
      </form>

      <button
        onClick={handleClearFilters}
        className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
      >
        Clear Filters
      </button>

      <div className="space-y-4">
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && filteredJobs.length === 0 && <p>No jobs found.</p>}
        {!loading &&
          !error &&
          filteredJobs.map((job) => (
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
                    onClick={() => handleApply(job._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleSaveJob(job._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Save Job
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

export default JobSearch;
