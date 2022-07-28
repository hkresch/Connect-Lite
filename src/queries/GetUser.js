import { gql, useQuery } from '@apollo/client';
import React, {useEffect} from 'react';
import Loader from '../components/Loader';
import { showsRanked } from '../atoms/ShowInfoAtom';
import {useRecoilState, useRecoilValue} from "recoil" 
import { userProfileState } from '../atoms/UserInfoAtom';

export const GET_USER = gql`
query Query($where: USERWhere) {
  users(where: $where) {
    name
    email
    shows {
      name
    }
    showsConnection {
      edges {
        ranking
      }
    }
  }
}
`


const GetUser =  (args) => {
    const [userState, setUserProfileState] = useRecoilState(userProfileState);
    const { loading, error, data } = useQuery(GET_USER, { variables: {
      where: {
        name:args.name
      }
    }});


    
    console.log(userState)

    if (loading) return <Loader/>;

    if (error) return 'Something Bad Happened';

    const user = data.users[0]
    const shows = (user.shows)
    const rankings = (user.showsConnection.edges) 

    console.log(data.users[0])

    // useEffect(()=>{
  
    //   if(!loading && data) {
        setUserProfileState(data.users[0])      
    //   }
    // },[data])
  
    // setUserProfileState(
    //     {
    //       user: user,
    //       shows: shows,
    //       rankings: rankings
    //     }
    //   )
      
    

    
    const UserInfo = shows.map((show, index) => {
      const rankingContent = rankings[index].ranking;
      return (
        <div>
          <ul>{show.name} : {rankingContent}</ul>
        </div>
      )})
    
    return (
  <div>
    <h1>{user.name}</h1>
    <h1>{user.email}</h1>
    <h1>Shows:{UserInfo}
    </h1>
  </div>
      
    );
    

} 

export default GetUser;

