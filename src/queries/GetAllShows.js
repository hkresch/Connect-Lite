import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loader from '../components/Loader';
import Button from 'react-bootstrap/esm/Button';
import ShowModal from '../components/ShowModal';
import Dropdown from 'react-bootstrap/Dropdown'

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
        </div>
    );
    
} 

export default GetAllShows;