import React, {useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GetUser from "../queries/GetUser";
import "../styles/Home.css";
import { auth, logout } from "../firebase";
import Loader from "../components/Loader";


function Home () {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const fetchUserName = async () => {
    try{
        const q = GetUser();
        setName(q.name);
    } catch (err) {
        console.error(err);
         alert("An error occured while fetching user data");
    }
    };

    fetchUserName(); 

    if (loading) return <Loader/>;

    if (!user) return navigate("/");


    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as 
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
            </div>
    );


}

export default Home;