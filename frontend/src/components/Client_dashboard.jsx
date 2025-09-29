import React from 'react'
import Client_sidebar from './Client_sidebar'
import { Outlet } from 'react-router-dom'

const Client_dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <div className="w-1/4 text-white"> */}
        <Client_sidebar />
      {/* </div> */}

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Client_dashboard
