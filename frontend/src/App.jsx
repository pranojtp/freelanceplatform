import './App.css'
import Authpage from './components/Authpage'
import Landing_page from './components/Landing_page'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import User_dashboard from './components/User_dashboard'


function App() {
    return (
        <>
            {/* <Landing_page /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing_page />} />
                    <Route path="/login" element={<Authpage />} />
                    <Route path="/userdashboard" element={<User_dashboard />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App
