import React, { useEffect } from "react";
import { userProfileState } from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import { RecommendationsState } from "../atoms/ShowInfoAtom";
import { useState } from "react";





export const GenerateRecommendation = () => {

    const recommendations = useRecoilValue(RecommendationsState);
    //console.log(recommendations)
    const [recs, setRecs] = useState("foo")
    // console.log(recommendations[1])
    // useEffect(() => {setRecs(recommendations[1])}, []) 

    // console.log(recs)

    

    const generateRec = ()  => {
        let r = Math.floor(Math.random() * recommendations.length)
        setRecs(recommendations[r].name)
        
    }

    const val = recommendations[1]

    return(
        <>
        <Button variant="outlined" onClick={() => generateRec()}>hi</Button>
        <div>
        {recs}
        </div>
        </>
    )
    


    
}