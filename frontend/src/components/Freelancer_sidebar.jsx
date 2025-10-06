import React from 'react'
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Freelancer_sidebar = () => {
    const navigation = [
        { name: 'New Projects', href: '/freelancerdashboard/clientWork' },
        { name: 'Proposals', href: '/freelancerdashboard/freelancerproposal' },
        { name: 'My Projects', href: '/freelancerdashboard/myprojects' },
        { name: 'Project Management', href: '/freelancerdashboard/project-management' },
        { name: 'Invoices', href: '/freelancerdashboard/freelancerinvoice' },

    ];
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/')
    }
    return (
        <>
            <div className="h-screen w-90 flex flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-800 px-6 p-4">
                <div className="relative flex flex-col h-16 shrink-0 mb-4">
                    <h1 className="text-3xl font-bold mb-4 text-white">Welcome Freelancer</h1>
                    <p className="text-l text-white">Explore Freelancehub</p>
                </div>

                <hr className="border-white mb-4" />

                <nav className="flex flex-col gap-2">
                    {navigation.map((item) => {
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-neutral-500 text-white font-medium text-xl"
                            >
                                {item.name}
                            </a>
                        );
                    })}
                    <Button onClick={handleLogout}>Logout</Button>
                </nav>
            </div>
        </>
    )
}

export default Freelancer_sidebar
