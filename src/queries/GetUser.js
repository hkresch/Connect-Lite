import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loader from '../components/Loader';

export const GET_USER = gql`
query Query {
    users(where: $where) {
      email
    }
  }
`


function GetUser ({where}) {
    const { loading, error, data } = useQuery(GET_USER, { variables: {where}});

    if (loading) return <Loader/>;

    if (error) return 'Something Bad Happened';

    return (
        <h1>{data.user.name}</h1>
    );
    
} 

export default GetUser;