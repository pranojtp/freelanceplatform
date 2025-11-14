import React from 'react'
// import Authpage from './Authpage'


export default function Intro() {
  const onNavigate = (path) => {
    console.log('Navigate to:', path)
  }

  return (
    <>
      {/* Backdrop with blurred background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Animated blur elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-32 left-32 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          <div className="absolute bottom-40 right-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-6000"></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <div className="text-sm tracking-wide text-blue-600 uppercase mb-4 font-semibold">
                  All-in-One Freelancing Platform
                </div>
                <h1 className="text-4xl lg:text-6xl text-gray-900 mb-6 font-bold leading-tight">
                  Streamline Your 
                  <span className="text-blue-600"> Freelance Business</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Stop juggling multiple tools. Manage proposals, invoices, projects, meetings, and client collaboration all in one powerful platform designed specifically for freelancers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => onNavigate('auth')} 
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-m font-semibold transform hover:scale-105"
                  >
                    Start Free Trial
                  </button>
                  <button 
                    className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 text-m font-semibold border border-gray-200 transform hover:scale-105"
                  >
                    Learn more
                  </button>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                  <div className="relative bg-white/20 backdrop-blur-sm rounded-xl  shadow-2xl ">
                    <img
                      src="https://i.pinimg.com/originals/ef/16/e4/ef16e4e68b0d3cb81e6bb8a8c3258d7e.gif"
                      alt="Freelancer workspace"
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                    {/* <Authpage /> */}
                  </div>
                  {/* Floating elements */}
                  {/* <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full blur-sm opacity-60 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full blur-sm opacity-60 animate-bounce animation-delay-1000"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}