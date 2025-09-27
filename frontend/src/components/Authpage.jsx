import React, { useState } from 'react';
import LoginForm from './Login';
import SignUpForm from './Signup';
// import { div } from 'three/tsl';


function Authpage() {
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle between Login and Sign Up

  return (
    <center><div className='pt-30'>
      <div className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
        {/* Replace with an actual arrow icon if you have one, or use a simple text arrow */}
        <a href="/">
        <span className="text-2xl mr-2">&larr;</span>Back
        </a>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
         {/* Header */}
        <div className="flex flex-col items-center mb-8">
          {/* <div className="bg-blue-600 rounded-full p-2 mb-4"> */}
            {/* This would be your logo SVG or image */}
          {/* </div> */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to FreelanceHub</h1>
          <p className="text-gray-500 text-sm">Start managing your freelance business today</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              isLoginView
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              !isLoginView
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsLoginView(false)}
          >
            Register
          </button>
        </div>

        {/* Render Forms */}
        {isLoginView ? <LoginForm /> : <SignUpForm />}
      </div>
      </div>
      </center>
    
  );
}

export default Authpage;