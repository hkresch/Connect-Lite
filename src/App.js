import Navbar from "./Navbar"
import React from "react"
import Home from "./pages/Home"
import People from "./pages/People"
import Shows from "./pages/Shows"
import Register from "./pages/Register"
import { Route, Routes } from "react-router-dom"
import LoginModal from "./components/LoginModal"
import LogoutModal from "./components/LogoutModal"
import { GetUser } from "./queries/GetUser"
import { useAuth } from "./contexts/UserAuth"
import { GetGenres } from "./queries/GetGenres"





const App = () => {
    const {user, authenticated} =useAuth();
    console.log(user)


    return (
     <>
     <Navbar />
    <div className="container">
    <GetUser email={user.email}/>
        <Routes>
            <Route 
            exact
            path="/"
            render={() => {
                return(
                    authenticated?
                    <Redirect to ="/home"/> :
                    <Redirect to="/components/LoginModal"/>
                )
            }}/> 
            <Route path="/home" element={<Home/>} />
            <Route path="/people" element={<People/>}/>
            <Route path="/shows" element={<Shows />} />
            <Route path="/logout" element={<LogoutModal/>}/>
        </Routes>
    </div>
</> 

    )
        

}

export default App








