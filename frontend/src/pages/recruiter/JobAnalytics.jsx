import React from 'react';

function JobAnalytics() {
  const analyticsData = [
    { jobId: 1, jobTitle: 'Senior Developer', applications: 50, views: 80 },
    { jobId: 2, jobTitle: 'UI Designer', applications: 30, views: 180 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Job Analytics</h2>
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