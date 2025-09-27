import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SocialAuthButton from './Socialauthbutton';
import axios from 'axios';

// import { ReactComponent as GoogleIcon } from '../assets/google.svg'; // Assume these SVGs exist
// import { ReactComponent as GitHubIcon } from '../assets/github.svg'; // Assume these SVGs exist

function LoginForm() {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  // //   const [rememberMe, setRememberMe] = useState(false);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log('Login attempt:', { email, password});
  //     // Handle login logic here
  //   };
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:3800/authuser/userlogin', form)
      .then((res) => {
        alert(res.data.message)
        if (res.data.usertoken) {
          localStorage.setItem("token", res.data.usertoken)
          navigate('/userdashboard')
        }
      })
      .catch((err) => {
        console.error(err)
        alert("Invalid credentials or server error")
        navigate('/login')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <SocialAuthButton text="Continue with Google" onClick={() => console.log('Google login')} />
      <SocialAuthButton text="Continue with GitHub" onClick={() => console.log('GitHub login')} />

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={form.email}
          onChange={handleChange}
          required
        />
        {/* <TextField id="outlined-basic" label="Email" variant="outlined" name='email' value={form.email} onChange={handleChange}/> */}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={form.password}
          onChange={handleChange}
          required
        />
        {/* <TextField id="outlined-basic" type='password' label="Password" variant="outlined" name='password' value={form.password} onChange={handleChange}/> */}
      </div>

      <div className="flex items-center justify-between mb-8">
        {/* <label className="flex items-center text-gray-700 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="ml-2">Remember me</span>
        </label> */}
        <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;