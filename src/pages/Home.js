import React, {useEffect, useState } from "react";
import GetUser, { GET_USER } from "../queries/GetUser";
import "../styles/Home.css";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/UserAuth";
import { gql, useQuery } from '@apollo/client';
import { GetUserShows } from "../queries/GetAllShows";



function Home () {
    const {user} =useAuth();

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as 
                <div>{user.name}</div>
                <div>{user.email}</div>
                <GetUser name={user.name}/>
            </div>
            </div>
    );


}

export default Home;