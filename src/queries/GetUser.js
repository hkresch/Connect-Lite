import { gql, useQuery } from '@apollo/client';
import React, {useEffect} from 'react';
import Loader from '../components/Loader';
import { showsRanked } from '../atoms/ShowInfoAtom';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil" 
import { userProfileState } from '../atoms/UserInfoAtom';
import { showsState, RankingsState } from '../atoms/ShowInfoAtom';

export const GET_USER = gql`
query GetUser($where: USERWhere) {
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
    const [showState, setshowsState] = useRecoilState(showsState);
    const [setRanking, setRankingsState] = useRecoilState(RankingsState)
    //const [RankingsState, setRankingsState] = useRecoilState(RankingsState)
    const { loading, error, data } = useQuery(GET_USER, //can implements a fetch policy on this 
      { variables: {
      where: {
        name:args.name
      }
    }});


    

    if (loading) return <Loader/>;

    if (error) return 'Something Bad Happened';

    const user = data.users[0]
    const shows = (user.shows)
    const rankings = (user.showsConnection.edges) 

    // useEffect(()=>{
  
    //   if(!loading && data) {
    setUserProfileState(data.users[0])
    setshowsState(data.users[0].shows)
    setRankingsState(user.showsConnection.edges)

    console.log(user.showsConnection.edges)
    

  
