import React, { useEffect, useState } from 'react';
import axios from '../axiosinterceptor';
import { useLocation } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/proposals/my-accepted-projects');
        setProjects(res.data);
        if (location.state?.project) {
          setSelectedProject(location.state.project);
        } else if (res.data.length) {
          setSelectedProject(res.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [location.state]);

  return (
    <div className="flex gap-6 p-6">
      {/* Left Sidebar - Projects List */}
      <div className="w-1/4">
        <h3 className="font-semibold mb-3">Projects</h3>
        {projects.map(p => (
          <div key={p._id}
               onClick={() => setSelectedProject(p)}
               className={`p-3 mb-2 rounded cursor-pointer ${selectedProject?._id === p._id ? 'bg-gray-400' : 'bg-gray-200'}`}>
            <div className="font-semibold">{p.projectName}</div>
            <div className="text-xs text-gray-600">
              Due: {p.dueDate ? new Date(p.dueDate).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Kanban */}
      <div className="w-3/4">
        {selectedProject ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedProject.projectName}</h2>
                <div className="text-sm text-gray-600">{selectedProject.projectDescription}</div>
              </div>
            </div>
            <KanbanBoard project={selectedProject} />
          </>
        ) : (
          <div>Select a project to manage</div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagementPage;

