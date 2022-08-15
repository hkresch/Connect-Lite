import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loader = () => 
  <div className='loader'>
    <ClipLoader
      size={150}
      color={'#3454D1'}
      loading={true}
    />
    <h1>Loading...</h1>
  </div> 

export default Loader
