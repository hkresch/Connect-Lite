import React, {useEffect, useState } from "react";
import GetUser, { GET_USER } from "../queries/GetUser";
import "../styles/Home.css";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/UserAuth";
import { fromPromise, gql, useQuery } from '@apollo/client';
import { GetUserShows } from "../queries/GetAllShows";
import DisplayUser from "../components/DisplayUser";
import { userProfileState } from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import { GenerateRecommendation } from "../components/GenerateRecommendation";




function Home () {
    const user = useRecoilValue(userProfileState)   

    

    return (
        <div>
        <div className="dashboard">
            <div className="dashboard__container">
                <div>{user.email}</div>
                <DisplayUser/>
        </div>
        </div>
            <GenerateRecommendation/>
        </div>

    );


}

export default Home;