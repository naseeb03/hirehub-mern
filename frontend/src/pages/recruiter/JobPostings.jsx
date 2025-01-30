import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';
import { getUserJobs } from '../../lib/api';

function JobPostings() {
  const [jobPostings, setJobPostings] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return;
      try {
        const response = await getUserJobs(user);
        setJobPostings(response);
      } catch (error) {
        console.error("Error fetching Jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex mb-4">
        <BackButton />
        <h1 className="text-2xl font-bold ml-2">Job Postings</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {jobPostings.map(job => (
            <div key={job._id} className="border-b pb-4">
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500 text-sm">{job.location}</p>
              <span className={`inline-block px-2 py-1 rounded text-sm ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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