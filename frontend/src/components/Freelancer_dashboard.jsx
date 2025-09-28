import React from 'react'
import Freelancer_sidebar from './Freelancer_sidebar'
import Freelancer_projects from './Freelancer_projects'


const Freelancer_dashboard = () => {
    return (
        <div className="flex-1 p-6 space-y-6 bg-neutral-900">
            <Freelancer_sidebar />
            <Freelancer_projects />
        </div>
        
    )
}

export default Freelancer_dashboard
