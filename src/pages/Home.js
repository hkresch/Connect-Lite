import React, {useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GetUser from "../queries/GetUser";
import "../styles/Home.css";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/UserAuth";
import LoginModal from "../components/LoginModal";
import LogoutModal from "../components/LogoutModal";

const logout = () => {
    auth.signOut().then(() => {
      console.log('logged out');
    }).catch((err) => {
      console.log(err);
    })

    localStorage.clear();
  }


function Home () {
    //const [user, loading, error] = useAuthState(auth);
    //const [loading] = useState();

    const user = useAuth();


    // const fetchUserName = async () => {
    // try{
    //     const q = GetUser();
    //     setName(q.name);
    // } catch (err) {
    //     console.error(err);
    //      alert("An error occured while fetching user data");
    // }
    // };

    // fetchUserName(); 

    //if (loading) return <Loader/>;


    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as 
                <div>{auth.name}</div>
                <div>{auth.email}</div>
                <a href="/logout">
                <button className="dashboard__btn">
                    Logout
                </button>
                </a>
                <LoginModal/>
            </div>
            </div>
    );


}

export default Home;