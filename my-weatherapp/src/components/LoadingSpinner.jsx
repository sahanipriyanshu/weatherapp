import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-white border-opacity-30 rounded-full animate-spin border-t-white"></div>
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-white border-opacity-20 rounded-full animate-spin border-t-white animate-reverse-spin"></div>
        
        {/* Center dot */}
        <div className="absolute top-6 left-6 w-4 h-4 bg-white rounded-full animate-pulse"></div>
      </div>
      
      <div className="ml-4 text-white">
        <div className="text-lg font-semibold">Loading weather data...</div>
        <div className="text-sm opacity-80">Please wait a moment</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;