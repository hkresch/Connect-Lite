import
import React, {useEffect} from 'react';
import Loader from '../components/Loader';



const SetUser =  (args) => {



    
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
