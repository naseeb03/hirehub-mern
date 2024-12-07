import { useState } from 'react';

function JobSearch() {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    jobType: 'all'
  });

  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced frontend developer...'
    },
    // Add more mock jobs here
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching with params:', searchParams);
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

      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow">
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
                onClick={() => handleApply(job.id)}
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