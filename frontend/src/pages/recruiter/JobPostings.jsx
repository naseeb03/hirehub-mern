import React, { useState, useEffect } from 'react';

function JobPostings() {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    setJobPostings([
      { id: 1, title: 'Senior Developer', company: 'Tech Corp', location: 'Remote', status: 'Active' },
      { id: 2, title: 'UI Designer', company: 'Design Co', location: 'New York', status: 'Active' },
      { id: 3, title: 'Backend Developer', company: 'Health Inc', location: 'San Francisco', status: 'Closed' }
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Job Postings</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {jobPostings.map(job => (
            <div key={job.id} className="border-b pb-4">
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500 text-sm">{job.location}</p>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPostings;