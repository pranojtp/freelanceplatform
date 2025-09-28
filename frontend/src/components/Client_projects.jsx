import React from 'react'

const Client_projects = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <a href="/addproject">
                <button
                    // onClick={handleSave}
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-[#02060b] transition"
                >
                    Add Projects
                </button>
                </a>
            </div>
        </>
    )
}

export default Client_projects
