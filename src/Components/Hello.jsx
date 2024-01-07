import React, { useState } from 'react';
import BaseComponent from './Base';
import useLogout from './Logout';
import ErrorComponent from './Error'; // Assuming you have this component

const HelloComponent = () => {
  const [error, setError] = useState(null);
  const logout = useLogout(setError);

  const HelloContent = () => {
    if (error) {
      return <ErrorComponent message={error.message} errorCode={error.errorCode} />;
    } else {
      return (
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Hello, World! (Protected Route)
          </h1>
          <button
            type="button"
            onClick={() => logout()}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-4"
          >
            Log out
          </button>
        </div>
      );
    }
  };

  return <BaseComponent Component={HelloContent} />;
};

export default HelloComponent;
