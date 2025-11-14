import React, { useState } from 'react';
import LoginForm from './Login';
import SignUpForm from './Signup';

function Authpage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="animated-gradient min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* subtle overlay to tone down the gradient behind the card */}
      <div className="absolute inset-0 pointer-events-none bg-black/10 backdrop-blur-xl"></div>

      {/* optional lightweight vector/illustration (SVG inline) */}
      <svg
        className="absolute -left-40 -top-40 w-96 h-96 opacity-10 pointer-events-none"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.8" />
            <stop offset="1" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="200" fill="url(#g)" />
      </svg>

      {/* Floating shapes (keeps page lively) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-8 w-40 h-40 rounded-full opacity-20 animate-float-slow" />
        <div className="absolute bottom-16 right-10 w-56 h-56 rounded-full opacity-18 animate-float-medium" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full opacity-16 animate-float-fast" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="relative">
          <div className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
            <a href="/">
              <span className="text-2xl text-white mr-2">&larr;</span>Back
            </a>
          </div>

          <div className="bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">Welcome to FreelanceHub</h1>
              <p className="text-gray-500 text-sm">Start managing your freelance business today</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`flex-1 py-3 text-center text-lg font-medium transition-colors ${isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => setIsLoginView(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 text-center text-lg font-medium transition-colors ${!isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => setIsLoginView(false)}
              >
                Register
              </button>
            </div>

            {isLoginView ? <LoginForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authpage;
