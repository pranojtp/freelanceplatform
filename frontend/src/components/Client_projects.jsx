import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosinterceptor';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


const Client_projects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axiosInstance.get('/projects/my-projects');
                setProjects(res.data.projects);
            } catch (err) {
                console.error('Error fetching projects:', err.response?.data || err.message);
            }
        };

        fetchProjects();
    }, []);
    return (
        <>
            <div className="flex flex-row justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <a href="/clientdashboard/addproject">
                    <button
                        // onClick={()=>}
                        className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-[#02060b] transition"
                    >
                        Add Projects
                    </button>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    projects.map((project) => (
                        <Card key={project._id} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                            <CardBody>
                                <Typography className="text-xl text-gray-700 hover:text-gray-900">
                                    Project Name:
                                    {project.projectName}
                                </Typography>
                                <Typography className="text-m pt-4 text-gray-600 hover:text-gray-900">
                                    {project.projectDescription}
                                </Typography>
                                <Typography className="text-base pt-4 text-gray-600 hover:text-gray-900">
                                    Estimated Amount:
                                    {project.estimatedAmount}
                                </Typography>
                                <Typography className="text-base pt-4 text-gray-600 hover:text-gray-900">
                                    Due Date:
                                    {/* {project.dueDate} */}
                                    {new Date(project.dueDate).toLocaleDateString()}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))
                }

            </div>




        </>
    )
}

export default Client_projects
