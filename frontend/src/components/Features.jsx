import {
    FileText,
    Receipt,
    FolderKanban,
    // Video,
    // Calendar,
    // Users
} from 'lucide-react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";

const Features = () => {
    const features_list = [
        {
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            title: "Proposal Management",
            description: "Create, send, and track proposals with professional templates"
        },
        {
            icon: <Receipt className="h-8 w-8 text-green-600" />,
            title: "Smart Invoicing",
            description: "Generate invoices and track payments with integrated payment gateways"
        },
        {
            icon: <FolderKanban className="h-8 w-8 text-purple-600" />,
            title: "Project Tracking",
            description: "Manage tasks, deadlines, and deliverables with Kanban boards"
        },
        // {
        //     icon: <Video className="h-8 w-8 text-red-600" />,
        //     title: "Video Conferencing",
        //     description: "Built-in video calls and meeting scheduling"
        // },
        // {
        //     icon: <Calendar className="h-8 w-8 text-orange-600" />,
        //     title: "Daily Progress",
        //     description: "Log work updates and export progress reports"
        // },
        // {
        //     icon: <Users className="h-8 w-8 text-indigo-600" />,
        //     title: "Collaboration",
        //     description: "Real-time chat and file sharing with clients"
        // }
    ];
    return (
        <>
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
                            Our comprehensive suite of tools helps you manage every aspect of your freelance business efficiently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features_list.map((feature, index) => (
                            // <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                            //     <CardHeader>
                            //         <div className="mx-auto mb-4">
                            //             {feature.icon}
                            //         </div>
                            //         <CardTitle className="text-xl">{feature.title}</CardTitle>
                            //     </CardHeader>
                            //     <CardContent>
                            //         <CardDescription className="text-base">
                            //             {feature.description}
                            //         </CardDescription>
                            //     </CardContent>
                            // </Card>
                            <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardBody>
                                    <div className="mx-auto mb-4">
                                        {feature.icon}
                                    </div>
                                    <Typography className="text-2xl text-black-600 hover:text-indigo-600">
                                        {feature.title}
                                    </Typography>
                                    <Typography className="text-base pt-4 text-gray-600 hover:text-gray-900">
                                        {feature.description}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="text-l text-gray-600 hover:text-gray-900">
                                    <Button>Readmore</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Features
