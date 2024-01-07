import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorComponent = ({ message, errorCode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border p-10 rounded-lg shadow-lg bg-white text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          An error occurred
        </h2>
        <p className="text-red-600">{errorCode && `Error ${errorCode}: `}{message}</p>
        <button
          onClick={() => navigate('/login')} // Adjust the route as necessary for your login page
          className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
