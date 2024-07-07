import React, { useState } from 'react';
import handleSignUp from 'passkey_linker/src/auth/handleSignUp';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSignUpClick = () => {
    handleSignUp(username, isChecked, process.env.REACT_APP_DEVELOPER_ID, process.env.REACT_APP_PROJECT_ID , 'localhost')
      .then(() => {
        alert('Sign up successful');
      })
      .catch(error => {
        console.error('Sign up failed:', error);
        alert('Sign up failed. Please try again.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F1F1F1]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">WebAuthn Signup</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="checkbox" className="block  text-sm font-medium text-gray-700">
              Allow Cross Platform
            </label>
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ml-2"
            />
          </div>
          <button
            type="button"
            onClick={handleSignUpClick}
            className="block w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
