import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgottenPasswordComponent = () => {
  const [email, setEmail] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [resetTokenGenerated, setResetTokenGenerated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResetTokenGenerated(false);
    setErrorMessage('');


    const response = await fetch('http://localhost:8000/forgotten-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Change content type to application/json
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setResetTokenGenerated(true);
    } else {
      setErrorMessage(data.message || 'An error occurred resetting your password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border p-10 rounded-lg shadow-lg bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
        </div>
        {!resetTokenGenerated ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <p className="mb-3 text-center text-sm font-medium text-red-600">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-center text-green-500">If your email is registered, you will receive a password reset link.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgottenPasswordComponent;
