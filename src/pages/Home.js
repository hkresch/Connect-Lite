import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetUser from "../queries/GetUser";
import "../styles/Home.css";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/UserAuth";



function Home () {
    const {user} =useAuth();
    //const [loading] = useState();

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as 
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>
            </div>
    );


}

export default Home;