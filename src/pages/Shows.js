import React from 'react';
import GetAllShows from '../queries/GetAllShows';
import AddShowButton from '../components/AddShowButton';
const Shows = () => {
    return (
        <div>
        <h2>Shows</h2>
        <GetAllShows/>
        <AddShowButton/>
        </div>
    )
}

export default Shows;