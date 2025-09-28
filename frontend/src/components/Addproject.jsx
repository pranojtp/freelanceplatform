import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Button
} from "@material-tailwind/react";
import axios from 'axios';


const Addproject = () => {
    const [form, setForm] = useState({
        projectName: "",
        projectDescription: "",
        estimatedAmount: "",
        dueDate: ""
    })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    let navigate = useNavigate()
    let location = useLocation()
    const handleSubmit = () => {
        axios.post('http://localhost:3800/projects/add', form)
            .then((res) => {
                setForm({
                    projectName: "",
                    projectDescription: "",
                    estimatedAmount: "",
                    dueDate: ""
                })
                navigate('/clientWork')
                
            })
            .catch((err) => {
                console.error(err)
            })
    }
    useEffect(() => {
        if (location.state != null) {
            setForm({
                ...form,
                projectName: location.state.project.projectName,
                projectDescription: location.state.project.projectDescription,
                estimatedAmount: location.state.project.estimatedAmount,
                dueDate: location.state.project.dueDate
            })
        }
    }, [location.state])
    return (
        <>
            <h2>Add Project</h2>
            <form className="space-y-4">
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
                    type="text"
                    placeholder="Estimated Amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    name='estimatedAmount'
                    value={form.estimatedAmount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    placeholder="Due Date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    name='dueDate'
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                />
                
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                    onClick={handleSubmit}
                >
                    Add Project
                </Button>
            </form>
        </>
    )
}

export default Addproject
