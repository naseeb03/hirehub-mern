import React from 'react';
import BackButton from '../../components/BackButton';

function JobAnalytics() {
  const analyticsData = [
    { jobId: 1, jobTitle: 'Senior Developer', applications: 50, views: 80 },
    { jobId: 2, jobTitle: 'UI Designer', applications: 30, views: 180 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex mb-4">
        <BackButton />
        <h1 className="text-2xl font-bold ml-2">Job Analytics</h1>
      </div>
      {analyticsData.length === 0 && <p>No analytics data found.</p>}
      {analyticsData.map((data) => (
        <div key={data.jobId} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">{data.jobTitle}</h3>
          <p className="text-gray-600">Applications: {data.applications}</p>
          <p className="text-gray-600">Views: {data.views}</p>
        </div>
      ))}
    </div>
  );
}

export default JobAnalytics;