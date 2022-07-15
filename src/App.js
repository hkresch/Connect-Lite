import Navbar from "./Navbar"
import React from "react"
import Home from "./pages/Home"
import People from "./pages/people"
import Shows from "./pages/shows"
import Login from "./components/LoginModal"
import Register from "./pages/Register"
import Reset from "./pages/Reset"
import { Route, Routes } from "react-router-dom"


const App = () => {

    return (
     <>
     <Navbar />
    <div className="container">
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/reset" element={<Reset/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/people" element={<People/>}/>
            <Route path="/shows" element={<Shows />} />
        </Routes>
    </div>
</> 

    )
        

}

export default App



