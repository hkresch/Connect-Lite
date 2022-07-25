import React from 'react' 
import GetAllUsers from '../queries/GetAllUsers';
import { useAuth } from "../contexts/UserAuth"

const People = () => {

    return(
        <div>
        <h2> People </h2>
        <GetAllUsers/>
        </div>

    )
}

export default People;