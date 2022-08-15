import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import { Typography, Rating, TextField} from '@mui/material'
import AddShowButton from '../components/AddShowButton'
import {ADD_RANKING} from '../mutations/AddRanking';
import { useAuth } from '../contexts/UserAuth';
import { showsState, RankingsState } from '../atoms/ShowInfoAtom';
import { useRecoilState, useRecoilValue } from "recoil"
import { userProfileState } from '../atoms/UserInfoAtom';
import { GET_USER } from './GetUser';
import { DELETE_RANKING } from '../mutations/DeleteRanking';
import { Col, Row } from 'antd'



export const GET_SHOWS = gql`
    query GetShows {
        shows {
            name
        }
    }`



function GetAllShows () {
    const [AddRanking] =  useMutation(ADD_RANKING, {
      refetchQueries: [
        {query: GET_USER},
        'GetUser'
      ],
    }
    )

    const [DeleteRanking] =  useMutation(DELETE_RANKING, {
      refetchQueries: [
        {query: GET_USER},
        'GetUser'
      ],
    }
    )

    const [value, setValue] = useState();
        
    
    const { loading, error, data } = useQuery(GET_SHOWS);

   // const AddorDeleteRanking = (newValue, name, showName) = {

   // }
    

    const user = useRecoilValue(userProfileState)
    const name = user.name
    const shows = useRecoilValue(showsState)
    console.log(shows)
    const ranks = useRecoilValue(RankingsState)
    console.log(ranks)
    // var rank = ranks
    // console.log(rank)
    // ///console.log(ranks)
    // const name = ranks.name;
    // // console.log(name)
    
 
    const showsList = shows


    const getRanking = (show) =>{
        for (let i = 0; i<showsList.length;i++){
          if (show === showsList[i].name){
            return ranks[i].ranking
          }
        }
        return 0

    }

    const ChangeRanking = (name, showName, newValue) => {
      if (newValue === null){ DeleteRanking ( {variables: 
        {
          "where": {
            "name": name
          },
          "disconnect": {
            "shows": [
              {
                "where": {
                  "node": {
                    "name": showName
                  }
                }
              }
            ]
          }
        }}
      )
      } else{
        AddRanking (
          {variables:{
              "where": {
                "name": name
              },
              "connect": {
                "shows": [
                  {
                    "where": {
                      "node": {
                        "name": showName
                      }
                    },
                    "edge": {
                      "ranking": newValue
                    }
                  }
                ]
              }
            }
            }
      )


      }
    }
    if (loading) return <Loader/>;

    if (error) return `Error! ${error.message}`;


  
    return (
<div >
  
  
      {data.shows.map((show) => (
        <p key={show.name}>
          
    <Typography component="legend" style={{fontSize: "25px", font:"American Typewriter", fontFamily:"serif", }}>{show.name}{show.description} </Typography>
        <Rating
        size='large'
        defaultValue={getRanking(show.name)}
        onChange={(event,newValue) => {ChangeRanking(name, show.name, newValue)}}
        />

        </p>))}
        
    
    
    
    
</div>


    );
    
} 

export default GetAllShows;
