import React, { useState, useEffect } from "react";
import axios from "../axiosinterceptor";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('/proposals/my-accepted-projects');
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Projects</h1>
            <div className="grid gap-3">
                {projects.map(proj => (
                    <div key={proj._id} className="border p-3 rounded flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold">{proj.projectName}</h2>
                            <p className="text-sm text-gray-600">{proj.projectDescription}</p>
                        </div>
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                            onClick={() => navigate('/freelancerdashboard/project-management', { state: { project: proj } })}
                        >
                            Manage Project
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProjects;
