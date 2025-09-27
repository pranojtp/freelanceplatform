
import Navbar from './Navbar'
import Intro from './Intro'
import Features from './Features'
import Workflow from './Workflow'
import Footer from './Footer'
// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Authpage from './Authpage'

const Landing_page = () => {
  return (
    <div>
      <Navbar />
      <Intro />
      <Features />
      <Workflow />
      <Footer />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Authpage />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default Landing_page
