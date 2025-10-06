
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import axiosInstance from '../axiosinterceptor';

const CreateProposal = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [form, setForm] = useState({
    proposedSolution: '',
    proposalAmount: '',
    dueDate: ''
  });

  const navigate = useNavigate();

  // fetch all projects for freelancer
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProjectId) {
      alert('Please select a project first.');
      return;
    }

    try {
      await axiosInstance.post('/proposals/create', {
        projectId: selectedProjectId,
        proposedSolution: form.proposedSolution,
        proposalAmount: form.proposalAmount,
        dueDate: form.dueDate
      });

      alert('Proposal sent successfully');
      setForm({ proposedSolution: '', proposalAmount: '', dueDate: '' });
      setSelectedProjectId('');
      navigate('/freelancerdashboard/clientWork');
    } catch (err) {
      console.error('Error sending proposal:', err);
      alert('Failed to send proposal');
    }
  };

  return (
    <div className="p-10 flex flex-col items-center gap-5">
      <h1 className="text-2xl font-semibold text-gray-800">Send Proposal</h1>

      {/* Project Dropdown */}
      <select
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
      >
        <option value="">-- Select a Project --</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.projectName} (Client: {project.client?.username})
          </option>
        ))}
      </select>

      {/* Proposal Form */}
      <form className="space-y-4 w-full max-w-lg" onSubmit={handleSubmit}>
        <textarea
          name="proposedSolution"
          placeholder="Proposed Solution"
          value={form.proposedSolution}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          name="proposalAmount"
          placeholder="Proposal Amount"
          value={form.proposalAmount}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <Button
          type="submit"
          className="w-full bg-gray-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
        >
          Send Proposal
        </Button>
      </form>
    </div>
  );
};

export default CreateProposal;

