import React from 'react' 
import GetAllUsers from '../queries/GetAllUsers';
import { useAuth } from "../contexts/UserAuth"

const People = () => {

    return(
        <div>
        <GetAllUsers/>
        </div>

    )
}

export default People;