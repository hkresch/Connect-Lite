import React, { useEffect } from "react";
import { userProfileState } from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import { RecommendationsState } from "../atoms/ShowInfoAtom";
import { useState } from "react";
import {List, Result} from 'antd'






export const GenerateRecommendation = () => {

    const recommendations = useRecoilValue(RecommendationsState);
    //console.log(recommendations)
    const [recs, setRecs] = useState("")
    // console.log(recommendations[1])
    // useEffect(() => {setRecs(recommendations[1])}, []) 

    // console.log(recs)

    

    const generateRec = ()  => {
        if (recommendations.length === 0){
            setRecs("Please Rate Before Asking for Recommendations!")
        }
        else{
        let r = Math.floor(Math.random() * recommendations.length)
        setRecs(recommendations[r])
        }
        
    }

    const val = recommendations[1]
    console.log(recs.description)


    return(
        <>
        <Button variant="outlined" onClick={() => generateRec()}>Generate Recommendation</Button>
        <div>
            <Result
            size="large"
            status="success"
            title={recs.name}
            subTitle={recs.description}
            />
        </div>
        </>
        
    )
    


    
}