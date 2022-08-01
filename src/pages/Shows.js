import React from 'react';
import GetAllShows from '../queries/GetAllShows';
import AddShowButton from '../components/AddShowButton';
const Shows = () => {
    return (
        <div>
        <h2>Show</h2>
        <AddShowButton/>
        <GetAllShows/>
        </div>
    )
}

export default Shows;