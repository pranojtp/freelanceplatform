import React from 'react'
import Client_projects from './Client_projects';



const Client_sidebar = () => {
    const navigation = [
        { name: 'Projects', href: '/clientprojects' },
        { name: 'Proposals', href: '/clientproposals' },
        { name: 'Invoices', href: '/clientinvoices' },
        { name: 'Payments', href: '/clientpayments' },
    ];
    return (
        <>
            <div className="h-screen w-90 flex flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-blue-500 px-6 p-4">
                <div className="relative flex flex-col h-16 shrink-0 mb-4">
                    <h1 className="text-3xl font-bold mb-4 text-white">Welcome Client</h1>
                    <p className="text-l text-white">Explore Freelancehub</p>
                </div>

                <hr className="border-white mb-4" />

                <nav className="flex flex-col gap-2">
                    {navigation.map((item) => {
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-black text-white font-medium"
                            >
                                {item.name}
                            </a>
                        );
                    })}
                </nav>
            </div>
            <Client_projects />
        </>
    )
}

export default Client_sidebar
