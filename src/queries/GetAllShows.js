import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import { Typography, Rating} from '@mui/material'
import { argsToArgsConfig } from 'graphql/type/definition';
import {ADD_RANKING} from '../mutations/AddRanking';
import { useAuth } from '../contexts/UserAuth';
import { showsState, RankingsState } from '../atoms/ShowInfoAtom';
import { useRecoilState, useRecoilValue } from "recoil"
import { userProfileState } from '../atoms/UserInfoAtom';
import GetRanking from './GetRanking';
import { GET_USER } from './GetUser';

const GET_SHOWS = gql`
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
        
    
    const { loading, error, data } = useQuery(GET_SHOWS);


    

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

    let value = ranks.ranking
    const getRanking = (show) =>{
        for (let i = 0; i<showsList.length;i++){
          if (show === showsList[i].name){
            return ranks[i].ranking
          }
        }
        return 0

    }
    if (loading) return <Loader/>;

    if (error) return `Error! ${error.message}`;


    return (
<div>
  {}
    {data.shows.map((show) => (
        <p key={show.name}>
          
    <Typography component="legend">{show.name}</Typography>
        <Rating
        name="simple-controlled"
        defaultValue={getRanking(show.name)}
        onChange={(event,newValue) => AddRanking (
            {variables:{
                "where": {
                  "name": name
                },
                "connect": {
                  "shows": [
                    {
                      "where": {
                        "node": {
                          "name": show.name
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
        )}
        />
        </p>
    ))};
</div>


    );
    
} 

export default GetAllShows;



{/* <div>
{data.shows.map((show) => (
    <p key= {show.name}>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {show.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">3 - Would Recommend! </Dropdown.Item>
                <Dropdown.Item href="#/action-2">2 - It was Fine</Dropdown.Item>
                <Dropdown.Item href="#/action-3">1 - Would Not Recommend</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Delete Rating</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </p>

))}
</div> */}