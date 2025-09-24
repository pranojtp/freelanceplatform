import React from 'react'
import { CheckCircle,FileText,FolderKanban,Receipt,ArrowRight } from 'lucide-react'

const Workflow = () => {
    return (
        <>
            <section className="py-20 bg-gradient-to-r from-violet-800 to-sky-600">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl text-white mb-6">
                        How FreelanceHub Works
                    </h2>
                    <p className="text-xl text-blue-100 mb-16">
                        Transform your freelance business in four simple steps. Get started in minutes, not hours.
                    </p>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                            {[
                                {
                                    step: 1,
                                    title: 'Sign Up & Setup',
                                    subtitle: 'Get started in 60 seconds',
                                    description: 'Create your account, customize your profile, and set up your freelance workspace with our guided onboarding.',
                                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
                                    icon: <CheckCircle className="h-8 w-8" />,
                                    color: 'from-green-400 to-emerald-500'
                                },
                                {
                                    step: 2,
                                    title: 'Create & Send Proposals',
                                    subtitle: 'Win more clients',
                                    description: 'Use professional templates to craft compelling proposals. Track views, responses, and conversion rates in real-time.',
                                    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
                                    icon: <FileText className="h-8 w-8" />,
                                    color: 'from-blue-400 to-cyan-500'
                                },
                                {
                                    step: 3,
                                    title: 'Manage Projects',
                                    subtitle: 'Stay organized',
                                    description: 'Organize tasks with Kanban boards, track deadlines, collaborate with clients, and monitor progress effortlessly.',
                                    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
                                    icon: <FolderKanban className="h-8 w-8" />,
                                    color: 'from-purple-400 to-violet-500'
                                },
                                {
                                    step: 4,
                                    title: 'Get Paid & Scale',
                                    subtitle: 'Secure payments',
                                    description: 'Generate professional invoices, track payments, and scale your business with automated workflows and insights.',
                                    image: 'https://images.unsplash.com/photo-1662787913261-7802f9b145bf?w=600&h=400&fit=crop',
                                    icon: <Receipt className="h-8 w-8" />,
                                    color: 'from-red-400 to-red-500'
                                }
                            ].map((step, index) => (
                                <div
                                    key={step.step}
                                    className="relative group"
                                    style={{
                                        animationDelay: `${index * 200}ms`,
                                        animation: 'fadeInUp 0.8s ease-out forwards'
                                    }}
                                >
                                    {/* Step Number Circle */}
                                    <div className="relative z-10 mx-auto w-20 h-20 mb-6">
                                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                                            <span className="text-white text-xl font-bold">{step.step}</span>
                                        </div>

                                        {/* Connecting Arrow */}
                                        {index < 3 && (
                                            <div className="hidden lg:block absolute top-1/2 left-full w-12 h-0.5 bg-white/30 transform -translate-y-1/2">
                                                <ArrowRight className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Step Content */}
                                    <div className="flex flex-wrap w-full ">
                                        {/* Step Image */}
                                        <div className="relative aspect-[3/2] overflow-hidden">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                            {/* Step Icon */}
                                            <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-all duration-300">
                                                {React.cloneElement(step.icon, {
                                                    className: "h-6 w-6 text-white"
                                                })}
                                            </div>
                                        </div>

                                        {/* Step Text */}
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-blue-100/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                                                {step.description}
                                            </p>

                                            {/* Progress Indicator */}
                                            <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${step.color} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
                                                    style={{ transitionDelay: `${index * 100}ms` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Arrow */}
                                    {index < 3 && (
                                        <div className="lg:hidden flex justify-center mt-6 mb-2">
                                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                                                <ArrowRight className="w-6 h-6 text-white transform rotate-90" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Workflow
