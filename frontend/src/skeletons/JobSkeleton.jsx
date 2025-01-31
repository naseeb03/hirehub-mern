import React from 'react';

const JobSearchSkeleton = () => {
  const jobSkeletons = Array(3).fill(null);

  return (
    <div className="space-y-6">
      {jobSkeletons.map((_, index) => (
        <div key={index} className="space-y-4 mt-4">
          <div className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="flex justify-between items-start">
              <div>
                <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
                <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse mt-2" />
                <div className="mt-2 space-x-2">
                  <div className="inline-block w-20 h-6 bg-gray-300 rounded-md animate-pulse" />
                  <div className="inline-block w-20 h-6 bg-gray-300 rounded-md animate-pulse" />
                  <div className="inline-block w-20 h-6 bg-gray-300 rounded-md animate-pulse" />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-32 h-10 bg-gray-300 rounded-md animate-pulse" />
                <div className="w-32 h-10 bg-gray-300 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobSearchSkeleton;
