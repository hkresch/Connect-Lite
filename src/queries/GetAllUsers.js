import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loader from '../components/Loader';


const GET_USERS = gql`
query Query {
    users {
      name
    }
  }
`


function GetAllUsers () {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <Loader/>;

    if (error) return `Error! ${error.message}`;


    return (
        <div>
            {data.users.map((user) => (
                <p key= {user.email}>
                    {user.name}
                </p>
            ))}
        </div>
    );
    
} 

export default GetAllUsers