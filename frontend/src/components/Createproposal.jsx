// // import React from 'react'
// // import { useState, useEffect } from 'react'
// // import { useNavigate, useLocation } from 'react-router-dom'
// // import {
// //     Button
// // } from "@material-tailwind/react";
// // import axiosInstance from '../axiosinterceptor';

// // const Createproposal = () => {
// //     const [form, setForm] = useState({
// //         projectName: "",
// //         projectDescription: "",
// //         proposalAmount: "",
// //         dueDate: ""
// //     })
// //     const handleChange = (e) => {
// //         setForm({ ...form, [e.target.name]: e.target.value })
// //     }
// //     let navigate = useNavigate()
// //     let location = useLocation()
// //     const handleSubmit = () => {
// //         axiosInstance.post('/proposals/create', form)
// //             .then((res) => {
// //                 setForm({
// //                     projectName: "",
// //                     projectDescription: "",
// //                     proposalAmount: "",
// //                     dueDate: ""
// //                 })
// //                 alert(res.data.message)
// //                 navigate('/freelancerdashboard/clientWork')

// //             })
// //             .catch((err) => {
// //                 console.error(err)
// //                 alert
// //             })
// //     }
// //     useEffect(() => {
// //         if (location.state != null) {
// //             setForm({
// //                 ...form,
// //                 projectName: location.state.proposal.projectName,
// //                 projectDescription: location.state.proposal.projectDescription,
// //                 proposalAmount: location.state.proposal.proposalAmount,
// //                 dueDate: location.state.proposal.dueDate
// //             })
// //         }
// //     }, [location.state])
// //     return (
// //         <>
// //             <div className='p-20 flex flex-col items-center gap-5'>
// //                 <h1 className='text-2xl text-gray-800 font-semibold' >Send Proposal</h1>
// //                 <form className="space-y-4" onSubmit={handleSubmit}>
// //                     <input
// //                         type="text"
// //                         placeholder="Project Name"
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
// //                         name='projectName'
// //                         value={form.projectName}
// //                         onChange={handleChange}
// //                         required
// //                     />


// //                     <input
// //                         type="text"
// //                         placeholder="Proposed Solution"
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
// //                         name='projectDescription'
// //                         value={form.projectDescription}
// //                         onChange={handleChange}
// //                         required
// //                     />


// //                     <input
// //                         type="text"
// //                         placeholder="Proposal Amount"
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
// //                         name='proposalAmount'
// //                         value={form.proposalAmount}
// //                         onChange={handleChange}
// //                         required
// //                     />

// //                     <input
// //                         type="date"
// //                         placeholder="Due Date"
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
// //                         name='dueDate'
// //                         value={form.dueDate}
// //                         onChange={handleChange}
// //                         required
// //                     />

// //                     <Button
// //                         type="submit"
// //                         className="w-full bg-gray-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition max-w-fit"
// //                     >
// //                         Send Proposal
// //                     </Button>
// //                 </form>
// //             </div>
// //         </>
// //     )
// // }

// // export default Createproposal

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button } from "@material-tailwind/react";
// import axiosInstance from '../axiosinterceptor';

// const Createproposal = () => {
//   const [form, setForm] = useState({
//     proposedSolution: "",
//     proposalAmount: "",
//     dueDate: ""
//   });
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // backend will fetch freelancer & client automatically
//       await axiosInstance.post('/proposals/create', {
//         projectId: location.state.project._id,  // <-- from project passed via navigation
//         proposedSolution: form.proposedSolution,
//         proposalAmount: form.proposalAmount,
//         dueDate: form.dueDate
//       });

//       alert('Proposal sent successfully');
//       navigate('/freelancerdashboard/clientWork');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to send proposal');
//     }
//   };

//   return (
//     <div className='p-20 flex flex-col items-center gap-5'>
//       <h1 className='text-2xl text-gray-800 font-semibold'>Send Proposal</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <textarea
//           placeholder="Proposed Solution"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           name='proposedSolution'
//           value={form.proposedSolution}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Proposal Amount"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           name='proposalAmount'
//           value={form.proposalAmount}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           placeholder="Due Date"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           name='dueDate'
//           value={form.dueDate}
//           onChange={handleChange}
//           required
//         />

//         <Button
//           type="submit"
//           className="w-full bg-gray-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition max-w-fit"
//         >
//           Send Proposal
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Createproposal;


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

