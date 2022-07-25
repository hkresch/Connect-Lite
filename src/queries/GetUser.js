import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loader from '../components/Loader';

export const GET_USER = gql`
query Query($where: USERWhere) {
  users(where: $where) {
    name
    email
    shows {
      name
    }
  }
}
`


const GetUser =  (args) => {
    const { loading, error, data } = useQuery(GET_USER, { variables: {
      where: {
        name:args.name
      }
    }});

    if (loading) return <Loader/>;

    if (error) return 'Something Bad Happened';

    const user = data.users[0]
    const shows = (user.shows[0])

    return (
      <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{shows.name}</h1>
        </div>
    );
    
} 

export default GetUser;