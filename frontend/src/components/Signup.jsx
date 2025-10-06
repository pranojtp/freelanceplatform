

import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function SignUpForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("⚠️ Please verify reCAPTCHA");
      return;
    }

    if (!role) return alert("Please select a role.");
    if (password !== confirmPassword) return alert("Passwords do not match!");

    try {
      const response = await axios.post("http://localhost:3800/authuser/userregister", {
        username: fullName,
        email,
        password,
        role,
        token: captchaToken
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
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full px-4 py-3 border rounded-md"/>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border rounded-md"/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border rounded-md"/>
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 border rounded-md"/>
      <select value={role} onChange={(e) => setRole(e.target.value)} required className="w-full px-4 py-3 border rounded-md">
        <option value="">Select your role</option>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>

      {/* ✅ Google reCAPTCHA */}
      <div className="mb-6 flex justify-center">
        <ReCAPTCHA sitekey="6LfH4d8rAAAAAJBdVq7fdQAodLuJo18tTKETEjBi" onChange={setCaptchaToken} />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md">Create Account</button>
    </form>
  );
}

export default SignUpForm;

