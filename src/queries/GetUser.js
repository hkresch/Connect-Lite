import { gql, useQuery } from '@apollo/client';
import React, {useEffect} from 'react';
import Loader from '../components/Loader';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil" 
import { userProfileState } from '../atoms/UserInfoAtom';
import { showsState, RankingsState, RecommendationsState } from '../atoms/ShowInfoAtom';

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
    recommendedShows{
      name
    }
  }
}
`

export function GetUser(args){
    //console.log(args.name)
    const [userState, setUserProfileState] = useRecoilState(userProfileState);
    const [showState, setshowsState] = useRecoilState(showsState);
    const [setRanking, setRankingsState] = useRecoilState(RankingsState);
    const [setRecs, setRecommendationsState] = useRecoilState(RecommendationsState)
    //const [RankingsState, setRankingsState] = useRecoilState(RankingsState)

    //console.log(args.name)

    const { loading, error, data } =  useQuery(GET_USER, { variables: {
      where: {
        email:args.email
      }
    }});
    console.log('hi')
    console.log(loading)
    //if (loading) return <Loader/>
    if (error) return 'Something Bad Happened'
    if (loading) return 'Loading'
    if (!loading){
      console.log(loading)
    }
    
    
    const user = data.users[0]
    const shows = (user.shows)
    const rankings = (user.showsConnection.edges)
    const recommendations =(user.recommendedShows)
    console.log(recommendations)


    setUserProfileState(user)
    setshowsState(shows)
    setRankingsState(rankings)
    setRecommendationsState(recommendations)

  }

  
  