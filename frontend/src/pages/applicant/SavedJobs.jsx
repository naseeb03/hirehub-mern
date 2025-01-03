import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SavedJobs() {
  // const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [savedJobs, setSavedJobs] = useState([
    {
      _id: '1',
      title: 'Software Engineer',
      company: 'Tech Solutions',
      location: 'New York, NY',
      type: 'Full-Time',
      salary: '$100,000/year',
      description: 'Develop and maintain web applications using modern frameworks.',
    },
    {
      _id: '2',
      title: 'Frontend Developer',
      company: 'Web Creations',
      location: 'San Francisco, CA',
      type: 'Part-Time',
      salary: '$50/hour',
      description: 'Design and implement user interfaces for various clients.',
    },
    {
      _id: '3',
      title: 'Backend Developer',
      company: 'Data Systems Inc.',
      location: 'Remote',
      type: 'Contract',
      salary: '$80/hour',
      description: 'Build and optimize backend systems for high-performance applications.',
    },
  ]);


  // useEffect(() => {
  //   const fetchSavedJobs = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`${import.meta.env.VITE_API_URL}/applicants/saved-jobs`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       setSavedJobs(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSavedJobs();
  // }, []);

  const handleApply = (jobId) => {
    console.log('Applying to job:', jobId);
  };

  const handleUnsaveJob = async (jobId) => {
    // try {
    //   const response = await axios.delete(
    //     `${import.meta.env.VITE_API_URL}/applicants/saved-jobs/${jobId}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //       }
    //     }
    //   );
    //   setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
    //   alert(response.data.message || 'Job unsaved successfully!');
    // } catch (error) {
    //   console.error('Error unsaving job:', error);
    //   alert('Failed to unsave job.');
    // }
    console.log("job unsaved", jobId)
  };

  return (
    <div className="space-y-6">
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
                    onClick={() => handleApply(job._id)}
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
