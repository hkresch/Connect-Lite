import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import { Typography, Rating} from '@mui/material'
import { argsToArgsConfig } from 'graphql/type/definition';
import {ADD_RANKING} from '../mutations/AddRanking';
import { useAuth } from '../contexts/UserAuth';
import { showsState } from '../atoms/ShowInfoAtom';
import { useRecoilValue } from "recoil"
import { userProfileState } from '../atoms/UserInfoAtom';

const GET_SHOWS = gql`
    query GetShows {
        shows {
            name
        }
    }`






function GetAllShows () {
    const [AddRanking] =  useMutation(ADD_RANKING)
        // update(cache, { data: {value}}) {
        //     cache.writeQuery({
        //         query: GET_USER,
        //         variables: {users: name}, //need to add the show as input
        //         data : {ranking: [value]} //set the edge ranking 

        //     })
        
    
    const { loading, error, data } = useQuery(GET_SHOWS);

    // const setShowsList = useSetRecoilState(showsState);

    const ranks = useRecoilValue(userProfileState)
    console.log(ranks)
    // const name = ranks.name;
    // console.log(name)
    
    // console.log(ranks.shows.length)
    // for (let i = 0; i< ranks.length; i++){
    //   console.log(ranks.name)
    // }

    const value = ranks.showsConnection;
    console.log(value)
    if (loading) return <Loader/>;

    if (error) return `Error! ${error.message}`;



    // setShowsList((oldShowsSet) => [
    //     {
    //         shows: data.shows
    //     }
    // ])


    return (
<div>
    {data.shows.map((show) => (
        <p key={show.name}>
          
    <Typography component="legend">{show.name}</Typography>
        <Rating
        name="simple-controlled"
        value={value}
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