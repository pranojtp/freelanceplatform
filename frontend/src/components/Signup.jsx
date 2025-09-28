// import React, { useState } from 'react';
// import SocialAuthButton from './Socialauthbutton';
// // import { ReactComponent as GoogleIcon } from '../assets/google.svg'; // Assume these SVGs exist
// // import { ReactComponent as GitHubIcon } from '../assets/github.svg'; // Assume these SVGs exist

// function SignUpForm() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log('Sign Up attempt:', { fullName, email, password});
//     // Handle sign-up logic here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <SocialAuthButton  text="Continue with Google" onClick={() => console.log('Google signup')} />
//       <SocialAuthButton  text="Continue with GitHub" onClick={() => console.log('GitHub signup')} />

//       <div className="flex items-center my-6">
//         <hr className="flex-grow border-gray-300" />
//         <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
//         <hr className="flex-grow border-gray-300" />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="fullName" className="sr-only">Full Name</label>
//         <input
//           type="text"
//           id="fullName"
//           placeholder="Enter your full name"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="email" className="sr-only">Email</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Enter your email"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="password" className="sr-only">Password</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Create a password"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-6">
//         <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           placeholder="Confirm your password"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </div>


//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         Create Account
//       </button>
//     </form>
//   );
// }

// export default SignUpForm;

import React, { useState } from 'react';
import axios from 'axios';
import SocialAuthButton from './Socialauthbutton';

function SignUpForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(''); // No default value
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3800/authuser/userregister", {
        username: fullName,
        email,
        password,
        role
      });

      alert("✅ " + response.data.message);

      // Reset form
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('');
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert("❌ " + error.response.data.message);
      } else {
        alert("❌ Server error, try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Social login */}
      {/* <SocialAuthButton text="Continue with Google" onClick={() => console.log('Google signup')} />
      <SocialAuthButton text="Continue with GitHub" onClick={() => console.log('GitHub signup')} />

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div> */}

      {/* Full Name */}
      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Create a password"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm your password"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {/* Role Dropdown */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select your role</option>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
      >
        Create Account
      </button>

      {/* Message */}
      {/* {message && <p className="text-center mt-4 text-sm">{message}</p>} */}
    </form>
  );
}

export default SignUpForm;
