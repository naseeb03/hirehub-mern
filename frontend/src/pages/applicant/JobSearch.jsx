import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobSearch() {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    jobType: 'all'
  });

  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/`);
        setJobs(response.data); // Assuming the response data is an array of jobs
        setFilteredJobs(response.data); // Initially set filtered jobs as all jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once on mount

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Filter jobs based on search parameters
    const filtered = jobs.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(searchParams.keyword.toLowerCase());
      const matchesLocation =
        job.location.toLowerCase().includes(searchParams.location.toLowerCase());
      const matchesJobType = searchParams.jobType === 'all' || job.type === searchParams.jobType;

      return matchesKeyword && matchesLocation && matchesJobType;
    });

    setFilteredJobs(filtered); // Update the filtered jobs state
  };

  const handleClearFilters = () => {
    // Clear all filters and show all jobs again
    setSearchParams({
      keyword: '',
      location: '',
      jobType: 'all'
    });
    setFilteredJobs(jobs); // Reset to all jobs
  };

  const handleApply = (jobId) => {
    // Implement apply logic here
    console.log('Applying to job:', jobId);
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
              onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Job title, skills, or company"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="City, state, or remote"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Job Type</label>
            <select
              value={searchParams.jobType}
              onChange={(e) => setSearchParams({ ...searchParams, jobType: e.target.value })}
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

      {/* Clear Filters Button */}
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
                <button
                  onClick={() => handleApply(job._id)} // Use job._id for the apply button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Apply Now
                </button>
              </div>
              <p className="mt-4 text-gray-700">{job.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobSearch;
