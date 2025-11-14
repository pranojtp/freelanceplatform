import React from "react";
import { CheckCircle } from "lucide-react";
// import freelance from '../assets/logo.png'
import { Menu, X } from "lucide-react";

export default function Navbar({ onNavigate }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    return (
        <>

            {/* Navigation */}
            <nav className="bg-white h-25 shadow-sm pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                {/* <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                </div> */}
                                <span className="ml-2 font-bold text-xl text-black">
                                    FreelanceHub
                                    {/* <img src={freelance} alt="logo" /> */}
                                </span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">Features</a>
                                <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">Products</a>
                                <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">Contact</a>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center text-sm md:ml-6 space-x-3">
                                <a href="/login">
                                    <button className="px-4 py-2 rounded-2xl bg-black text-white shadow-md hover:bg-blue-600 transition" onClick={() => onNavigate('auth')}>
                                        Login
                                    </button></a>
                                <a href="/login">
                                    <button className="px-4 py-2 rounded-2xl bg-black text-white shadow-md hover:bg-blue-600 transition" onClick={() => onNavigate('auth')}>
                                        Get Started
                                    </button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}

