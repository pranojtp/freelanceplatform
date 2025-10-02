import './App.css'
import Authpage from './components/Authpage'
import Landing_page from './components/Landing_page'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import User_dashboard from './components/User_dashboard'
import Client_dashboard from './components/Client_dashboard'
import Freelancer_dashboard from './components/Freelancer_dashboard'
import Freelancer_projects from './components/Freelancer_projects'
import Client_projects from './components/Client_projects'
import Addproject from './components/Addproject'
import Createproposal from './components/Createproposal'
import Freelancer_proposals from './components/Freelancer_proposals'
import Client_proposals from './components/Client_proposals'
import Project_management from './components/Project_management'
import Createinvoice from './components/Createinvoice'
import Freelancer_invoices from './components/Freelancer_invoices'
import Clientinvoices from './components/Clientinvoices'
import PaymentSuccess from './components/paymentSuccess'


function App() {
    return (
        <>
            {/* <Landing_page /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing_page />} />
                    <Route path="/login" element={<Authpage />} />

                    <Route path="/userdashboard" element={<User_dashboard />}></Route>
                    <Route path="/clientdashboard" element={<Client_dashboard />}>
                        <Route path="clientprojects" element={<Client_projects />} />
                        <Route path="addproject" element={<Addproject />} />
                        <Route path="clientproposals" element={<Client_proposals />} />
                        <Route path="clientinvoices" element={<Clientinvoices />} />
                        <Route path="payment-success/:invoiceId" element={<PaymentSuccess />} />
                    </Route>

                    <Route path="/freelancerdashboard" element={<Freelancer_dashboard />}>
                        <Route path="clientWork" element={<Freelancer_projects />} />
                        <Route path="sendProposal" element={<Createproposal />} />
                        <Route path="freelancerproposal" element={<Freelancer_proposals/>} />
                        <Route path="fleelancerproject" element={<Project_management/>} />
                        <Route path="freelancerinvoice" element={<Freelancer_invoices/>} />
                        <Route path="createinvoice" element={<Createinvoice/>} />

                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App
