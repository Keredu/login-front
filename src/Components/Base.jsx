import React from "react";

const BaseComponent = ({ Component, ...props }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border p-10 rounded-lg shadow-lg bg-white">
        <Component {...props} />
      </div>
    </div>
  );
};

export default BaseComponent;
