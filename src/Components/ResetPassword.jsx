import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from './Error';

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search)
  const resetPasswordToken = queryParameters.get("token")

  if (!resetPasswordToken) {
    const message = 'Not valid URL.';
    return <ErrorComponent message={message} errorCode={404} />;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordChanged(false);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const response = await fetch('http://localhost:8000/reset-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: resetPasswordToken,
        password: password,
      }),
    });

    if (response.ok) {
      setPasswordChanged(true);
    } else {
      const data = await response.json();
      setErrorMessage(data.message || 'An error occurred resetting your password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border p-10 rounded-lg shadow-lg bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
        </div>
        {!passwordChanged ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="sr-only">Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-2"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            <p className="text-center text-green-500">Password changed successfully!</p>
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

export default ResetPasswordComponent;
