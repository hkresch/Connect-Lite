import Navbar from "./Navbar"
import React from "react"
import Home from "./pages/Home"
import People from "./pages/people"
import Shows from "./pages/shows"
import Register from "./pages/Register"
import Reset from "./pages/Reset"
import { Route, Routes } from "react-router-dom"
import LoginModal from "./components/LoginModal"
import LogoutModal from "./components/LogoutModal"


const App = () => {

    return (
     <>
     <Navbar />
    <div className="container">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/people" element={<People/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/shows" element={<Shows />} />
            <Route path="/logout" element={<LogoutModal/>}/>
        </Routes>
    </div>
</> 

    )
        

}

export default App








