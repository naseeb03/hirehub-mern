import React from "react";

const ApplicationSkeleton = () => {
  const applicationSkeletons = Array(5).fill(null);

  return (
    <div className="space-y-4">
      {applicationSkeletons.map((_, idx) => (
          <div key={idx} className="border-b pb-4 flex items-center space-x-4">
            <div className="w-20 h-6 rounded bg-gray-200 animate-pulse"></div>

            <div className="flex-1">
              <div className="w-40 h-4 rounded mb-2 bg-gray-200 animate-pulse"></div>
              <div className="w-32 h-4 rounded bg-gray-200 animate-pulse"></div>
            </div>

            <div className="w-20 h-6 rounded bg-gray-200 animate-pulse"></div>
          </div>
        ))}
    </div>
  );
};

export default ApplicationSkeleton;