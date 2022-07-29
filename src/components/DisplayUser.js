import React, {useEffect} from 'react';
import Loader from './Loader';
import {GetUser}  from '../queries/GetUser';
import { userProfileState } from '../atoms/UserInfoAtom';
import { useRecoilValue } from 'recoil';
import {showsState, RankingsState} from '../atoms/ShowInfoAtom'



function DisplayUser(){

  const user = useRecoilValue(userProfileState)
  const shows = useRecoilValue(showsState)
  const rankings = useRecoilValue(RankingsState)

  console.log(user)

    
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

export default DisplayUser;
