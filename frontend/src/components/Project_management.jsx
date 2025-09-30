import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosinterceptor';

const Project_management = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get('/proposals/my-accepted');
        setProjects(res.data);
        if (res.data.length > 0) setSelectedProject(res.data[0]); // select first project by default
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex gap-6 p-6">
      {/* Left Section: Accepted Projects */}
      <div className="w-1/4 space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => setSelectedProject(project)}
            className={`border p-4 rounded-md cursor-pointer ${
              selectedProject?._id === project._id ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <h2 className="font-semibold">{project.project.projectName}</h2>
            <p>{project.client.username}</p>
            <p>Progress: {project.progress || 0}%</p>
            <span className={`text-sm px-2 py-1 rounded-full ${
              project.status === 'active' ? 'bg-green-100 text-green-800' :
              project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status || 'active'}
            </span>
          </div>
        ))}
      </div>

      {/* Right Section: Kanban Board */}
      <div className="flex-1 grid grid-cols-4 gap-4">
        {['TO DO', 'IN PROGRESS', 'REVIEW', 'COMPLETED'].map((column) => (
          <div key={column} className="bg-gray-100 p-4 rounded-md min-h-[300px]">
            <h3 className="font-semibold mb-2">{column}</h3>
            {selectedProject?.tasks
              ?.filter((task) => task.status === column.toLowerCase().replace(' ', '_'))
              .map((task) => (
                <div key={task._id} className="bg-white p-3 rounded-md shadow mb-2">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span className={`px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs mt-1">Assigned: {task.assignee}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project_management;
