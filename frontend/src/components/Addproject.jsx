// import React from 'react'
// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import {
//     Button
// } from "@material-tailwind/react";
// // import axios from 'axios';
// import axiosInstance from '../axiosinterceptor';


// const Addproject = () => {
//     const [form, setForm] = useState({
//         projectName: "",
//         projectDescription: "",
//         estimatedAmount: "",
//         dueDate: ""
//     })
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }
//     let navigate = useNavigate()
//     let location = useLocation()
//     const handleSubmit = () => {
//         axiosInstance.post('http://localhost:3800/projects/add', form)
//             .then((res) => {
//                 setForm({
//                     projectName: "",
//                     projectDescription: "",
//                     estimatedAmount: "",
//                     dueDate: ""
//                 })
//                 navigate('/clientWork')
                
//             })
//             .catch((err) => {
//                 console.error(err)
//             })
//     }
//     useEffect(() => {
//         if (location.state != null) {
//             setForm({
//                 ...form,
//                 projectName: location.state.project.projectName,
//                 projectDescription: location.state.project.projectDescription,
//                 estimatedAmount: location.state.project.estimatedAmount,
//                 dueDate: location.state.project.dueDate
//             })
//         }
//     }, [location.state])
//     return (
//         <>
//         <div className='p-20 flex flex-col items-center gap-5'>
//             <h1 className='text-2xl text-gray-800 font-semibold' >Add Project</h1>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Project Name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                     name='projectName'
//                     value={form.projectName}
//                     onChange={handleChange}
//                     required
//                 />

                
//                 <input
//                     type="text"
//                     placeholder="Project Description"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                     name='projectDescription'
//                     value={form.projectDescription}
//                     onChange={handleChange}
//                     required
//                 />

                
//                 <input
//                     type="text"
//                     placeholder="Estimated Amount"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                     name='estimatedAmount'
//                     value={form.estimatedAmount}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="date"
//                     placeholder="Due Date"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                     name='dueDate'
//                     value={form.dueDate}
//                     onChange={handleChange}
//                     required
//                 />
                
//                 <Button
//                     type="submit"
//                     className="w-full bg-gray-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
//                 >
//                     Add Project
//                 </Button>
//             </form>
//             </div>
//         </>
//     )
// }

// export default Addproject

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import axiosInstance from '../axiosinterceptor';

const Addproject = () => {
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    estimatedAmount: "",
    dueDate: ""
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    try {
      const payload = {
        ...form,
        estimatedAmount: Number(form.estimatedAmount), // ensure number
      };

      const res = await axiosInstance.post('/projects/add', payload);

      console.log("Project added:", res.data);

      // reset form
      setForm({
        projectName: "",
        projectDescription: "",
        estimatedAmount: "",
        dueDate: ""
      });

      navigate('/clientdashboard/clientprojects');
    } catch (err) {
      console.error("Error adding project:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (location.state != null) {
      setForm({
        ...form,
        projectName: location.state.project.projectName,
        projectDescription: location.state.project.projectDescription,
        estimatedAmount: location.state.project.estimatedAmount,
        dueDate: location.state.project.dueDate?.slice(0, 10) || "" // format date
      });
    }
  }, [location.state]);

  return (
    <div className='p-20 flex flex-col items-center gap-5'>
      <h1 className='text-2xl text-gray-800 font-semibold'>Add Project</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name='projectName'
          value={form.projectName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Project Description"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name='projectDescription'
          value={form.projectDescription}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Estimated Amount"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name='estimatedAmount'
          value={form.estimatedAmount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          name='dueDate'
          value={form.dueDate}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          className="w-full bg-gray-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
        >
          Add Project
        </Button>
      </form>
    </div>
  );
};

export default Addproject;
