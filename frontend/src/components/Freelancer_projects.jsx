import React from 'react'
import { useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { useEffect } from 'react';
import axios from 'axios';

const Freelancer_projects = () => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3800/projects/")
            .then((res) => {
                setProjects(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (

                    <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardBody>
                            {/* <div className="mx-auto mb-4">
                                        {feature.icon}
                                    </div> */}
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
                        <CardFooter className="text-l text-white">
                            <a href="/freelancerdashboard/sendProposal"><Button className='bg-gray-700 hover:bg-gray-800'>Send Proposal</Button></a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Freelancer_projects
