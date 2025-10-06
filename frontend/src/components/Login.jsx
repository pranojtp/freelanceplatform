
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCaptcha = (token) => setCaptchaToken(token);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("⚠️ Please verify reCAPTCHA");
      return;
    }

    axios.post('http://localhost:3800/authuser/userlogin', { ...form, token: captchaToken })
      .then(res => {
        alert(res.data.message);
        if (res.data.usertoken) {
          localStorage.setItem("token", res.data.usertoken);
          localStorage.setItem("role", res.data.role);

          if (res.data.role === "client") navigate('/clientdashboard');
          else if (res.data.role === "freelancer") navigate('/freelancerdashboard');
          else navigate('/userdashboard');
        }
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || "Invalid credentials or server error");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4"
      />

      {/* ✅ Google reCAPTCHA */}
      <div className="mb-6 flex justify-center">
        <ReCAPTCHA
          sitekey="6LfH4d8rAAAAAJBdVq7fdQAodLuJo18tTKETEjBi"
          onChange={handleCaptcha}
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
