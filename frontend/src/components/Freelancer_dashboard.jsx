import React from 'react'
import Freelancer_sidebar from './Freelancer_sidebar'
import { Outlet } from 'react-router-dom'

const Freelancer_dashboard = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                {/* <div className="w-1/4 text-white"> */}
                <Freelancer_sidebar />
                {/* </div> */}

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>

    )
}

export default Freelancer_dashboard
