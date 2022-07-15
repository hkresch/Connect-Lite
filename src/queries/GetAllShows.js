import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loader from '../components/Loader';

const GET_SHOWS = gql`
    query GetShows {
        shows {
            name
        }
    }`

function GetAllShows () {
    const { loading, error, data } = useQuery(GET_SHOWS);

    if (loading) return <Loader/>;

    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {data.shows.map((show) => (
                <p key= {show.name}>
                    {show.name}
                </p>
            
            ))}
        </div>
    );
    
} 

export default GetAllShows;