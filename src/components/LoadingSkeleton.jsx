import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-smoke-700 rounded-lg overflow-hidden shadow-sm border border-stone-900">
          <div className="w-full aspect-square skeleton"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 skeleton rounded w-3/4"></div>
            <div className="h-4 skeleton rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-6 skeleton rounded-full w-20"></div>
              <div className="h-6 skeleton rounded-full w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
