import React from 'react';

function RecApplicationSkeleton() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {Array(5)
          .fill(null)
          .map((_, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-2/3 rounded-md"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-1/2 rounded-md"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-1/3 rounded-md"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-1/4 rounded-md"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-1/4 rounded-md"></div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecApplicationSkeleton;
