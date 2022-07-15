import React from 'react' 
import GetAllUsers from '../queries/GetAllUsers';

const People = () => {
    return(
        <div>
        <h2> People </h2>
        <GetAllUsers/>
        </div>

    )
}

export default People;