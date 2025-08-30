import React from 'react';

export const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className={`
          animate-spin rounded-full 
          ${sizeClasses[size]} 
          border-blue-500 border-t-transparent
        `}
      />
    </div>
  );
};

export const LoadingOverlay = ({ children, isLoading }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    </div>
  );
};
